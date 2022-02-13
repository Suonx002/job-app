import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import { verifyPassword, hashPassword } from '@functionHelpers/auth/passwords';
// import prisma from '@functionHelpers/initDB';
// import { Session } from '@functionHelpers/auth/session';

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	// session: {
	// 	jwt: true,
	// },
	pages: {
		// signIn: '/sign-in',
		// signOut: "/auth/logout",
		// error: "/auth/error", // Error code passed in query string as ?error=
	},
	site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			id: 'app-login',
			name: 'App Login',
			credentials: {
				firstName: {
					label: 'First Name',
					type: 'text',
				},
				lastName: {
					label: 'last Name',
					type: 'text',
				},
				email: {
					label: 'Email Address',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				console.log({ credentials });

				try {
					let maybeUser = await prisma.user.findFirst({
						where: {
							email: credentials.email,
						},
					});

					// register process calling
					if (credentials.methodType === 'register') {
						if (!maybeUser) {
							if (
								!credentials.password ||
								!credentials.email ||
								!credentials?.firstName ||
								!credentials.lastName
							) {
								throw new Error('Please fill all of the information');
							}

							maybeUser = await prisma.user.create({
								data: {
									firstName: credentials.firstName,
									lastName: credentials.lastName,
									email: credentials.email,
									password: await hashPassword(credentials.password),
								},
							});
						} else {
							throw new Error('User already existed, please login.', 400);
						}
					} else {
						// login process calling
						// user existed, need to verify user credentials

						if (!maybeUser) {
							throw new Error('No user found. Please create one');
						}

						if (!credentials.password || !credentials.email) {
							throw new Error('Please fill out all of the information');
						}

						const isValid = await verifyPassword(
							credentials?.password,
							maybeUser.password
						);
						if (!isValid) {
							throw new Error('Invalid Credentials');
						}
					}

					return maybeUser;
				} catch (error) {
					console.log(error);
					throw error;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('fire signin Callback');
			return true;
		},
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log('fire jwt Callback');

			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token, user }) {
			console.log('fire session Callback');

			// const sess: Session = {
			// 	...session,
			// 	user: {
			// 		...session.user,
			// 		id: token.id as string,
			// 		role: token.role as string,
			// 	},
			// };
			// return sess;

			return session;
		},
	},
});
