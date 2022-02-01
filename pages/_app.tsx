import type { AppProps } from 'next/app';

import customTheme from '@styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '@src/components/sidebar';

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
	const getContent = () => {
		console.log({
			pathname: appProps.router.pathname,
			isTrue: [`/`].includes(appProps.router.pathname),
		});
		if ([`/`].includes(appProps.router.pathname))
			return <Component {...pageProps} />;

		return (
			<Sidebar>
				<Component {...pageProps} />{' '}
			</Sidebar>
		);
	};

	return (
		<ChakraProvider theme={customTheme} resetCSS>
			{getContent()}
		</ChakraProvider>
	);
}

export default MyApp;
