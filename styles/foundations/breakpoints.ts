// 1. Import the utilities
import { createBreakpoints } from '@chakra-ui/theme-tools';
// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1880px',
});

export default breakpoints;
