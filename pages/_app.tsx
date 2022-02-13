import type { AppProps } from 'next/app';

import customTheme from '@styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '@src/components/sidebar';

import { SessionProvider } from 'next-auth/react';

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
	...appProps
}: AppProps) {
	const getContent = () => {
		// console.log({
		// 	pathname: appProps.router.pathname,
		// 	isTrue: [`/`].includes(appProps.router.pathname),
		// });
		if ([`/`].includes(appProps.router.pathname))
			return <Component {...pageProps} />;

		return (
			<Sidebar>
				<Component {...pageProps} />{' '}
			</Sidebar>
		);
	};

	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={customTheme} resetCSS>
				{getContent()}
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
