import type { AppProps } from 'next/app';

import customTheme from '@styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={customTheme} resetCSS>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
