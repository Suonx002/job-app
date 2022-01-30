import theme from '@chakra-ui/theme';

const buttonStyles = {
	components: {
		Button: {
			variants: {
				// TO USE EXAMPLE: <Button variant="no-hover"> Title </Button>
				// these are examples for creating custom variants
				'no-hover': {
					_hover: {
						boxShadow: 'none',
					},
				},
				'with-shadow': {
					boxShadow: '0 0 2px 2px blue',
				},
				// example for extending variants "outline", and make border thick
				// unfornately we can only extends & not able to access the object
				// https://github.com/chakra-ui/chakra-ui/discussions/2974#discussioncomment-379564
				'thick-outline': (props) => ({
					...theme.components.Button.variants.outline(props),
					borderWidth: `${props.borderWidth || 6}px`,
				}),
			},
		},
	},
};

export default buttonStyles;
