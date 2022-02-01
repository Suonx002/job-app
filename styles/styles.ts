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
		"50": "#e9ebf4",
		"100": "#c7cce4",
		"200": "#a3acd2",
		"300": "#808cc0",
		"400": "#6572b2",
		"500": "#4b59a6",
		"600": "#45519c",
		"700": "#3c4790",
		"800": "#353d84",
		"900": "#292c6d"
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
