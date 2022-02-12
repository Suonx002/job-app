import { Box } from '@chakra-ui/react';
import JobsList from '@src/components/jobs';
import React from 'react';

const ALlJobs = () => {
	return (
		<Box>
			<Box>all jobs</Box>
			<Box>
				<JobsList />
			</Box>
		</Box>
	);
};

export default ALlJobs;
