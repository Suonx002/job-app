import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import { verifyPassword, hashPassword } from '@functionHelpers/auth/passwords';

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	// session: {
	// 	jwt: true,
	// },
	pages: {
		// signIn: '/auth/signin',
		// signOut: "/auth/logout",
		// error: "/auth/error", // Error code passed in query string as ?error=
	},
	logger: {
		error(code, metadata) {
			console.log({ type: 'inside error logger', code, metadata });
		},
		warn(code) {
			console.log({ type: 'inside warn logger', code });
		},
		debug(code, metadata) {
			console.log({ type: 'inside debug logger', code, metadata });
		},
	},
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
				console.log('Starting the signup/login process ---');
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
									name: `${credentials.firstName} ${credentials.lastName}`,
									firstName: credentials.firstName,
									lastName: credentials.lastName,
									email: credentials.email,
									password: await hashPassword(credentials.password),
								},
							});
						} else {
							throw new Error('User already existed, please login.');
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

					console.log('Ending the signup/login process ---');

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
			console.log('fire redirect Callback');
			return baseUrl;
		},
		async session({ session, user, token }) {
			console.log('fire SESSION Callback');
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log('fire jwt Callback');

			// console.log({ token, user, account, profile, isNewUser });
			return token;
		},
	},
});
