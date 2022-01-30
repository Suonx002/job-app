const colors = {
	primary: {
		50: '#e7ebe4',
		100: '#c4cfbd',
		200: '#a0b095',
		300: '#7c956a',
		400: '#62834a',
		500: '#49712a',
		600: '#416524',
		700: '#36561c',
		800: '#2a4714',
		900: '#172b02',
	},
	secondary: {
		50: '#ffebee',
		100: '#ffccd1',
		200: '#f49897',
		300: '#eb6f6f',
		400: '#f64c4a',
		500: '#fa382d',
		600: '#ec2d2d',
		700: '#da2127',
		800: '#cd1720',
		900: '#bf0012',
	},
	darkGray: '#c0c0c0',
	lightGray: '#f2f2f2',
};

const config = {
	initialColorMode: 'light',
	useSystemColorMode: true,
	cssVarPrefix: 'codingvu',
};

const fonts = {
	heading: 'Oswald',
	body: 'Roboto',
};

const styles = {
	colors,
	fonts,
	config,
};

export default styles;
