import { Box } from '@chakra-ui/react';
import Sidebar from '@src/components/sidebar';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<Box>
			<Sidebar />
		</Box>
	);
};

export default Home;
