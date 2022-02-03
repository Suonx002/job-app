const colors = {
	primary: {
		"50": "#fde4eb",
		"100": "#fbbbcd",
		"200": "#f890ac",
		"300": "#f4638b",
		"400": "#f04272",
		"500": "#ec255a",
		"600": "#db2158",
		"700": "#c61c54",
		"800": "#b11651",
		"900": "#8d0d4a"
	},
	secondary: {
		"50": "#eee8fd",
		"100": "#d2c7fa",
		"200": "#b4a2f8",
		"300": "#937cf6",
		"400": "#765ef3",
		"500": "#5541f0",
		"600": "#473ce9",
		"700": "#2e34e0",
		"800": "#002fda",
		"900": "#0022d1"
	},
	darkGray: '#c0c0c0',
	lightGray: '#f2f2f2',
};

const config = {
	initialColorMode: 'light',
	useSystemColorMode: true,
	cssVarPrefix: 'job-app',
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
