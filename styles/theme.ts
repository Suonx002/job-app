// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

// global style overrides
import styles from './styles';

// Foundational style overrides
import foundationStyles from './foundations';

// Component style overrides
import componentStyles from './components';

const overrides = {
	...styles,
	...componentStyles,
	...foundationStyles,
};

const customTheme = extendTheme(overrides);

export default customTheme;
