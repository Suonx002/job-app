import { Box } from '@chakra-ui/react';
import Homepage from '@src/components/home';

import { GetServerSidePropsContext } from 'next';

import {
	getSession,
	getCsrfToken,
	signIn,
	getProviders,
} from 'next-auth/react';

const Home: NextPage = ({ csrfToken, providers, session }) => {
	return (
		<Homepage csrfToken={csrfToken} providers={providers} session={session} />
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	// if (session) {
	// 	return { redirect: { permanent: false, destination: '/dashboard' } };
	// }

	const csrfToken = await getCsrfToken({ req: context.req });
	const providers = await getProviders();

	let providerFilter = [];
	for (let provider in providers) {
		if (providers[provider].type !== 'credentials') {
			providerFilter.push(providers[provider]);
		}
	}

	return {
		props: { csrfToken, providers: providerFilter, session },
	};
}

export default Home;
