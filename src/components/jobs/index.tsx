import { Box, Flex } from '@chakra-ui/react';
import format from 'date-fns/format';
import React from 'react';
import JobItem from './jobItem';
import jobsMock from './jobsMock';

const JobsList = () => {
	return (
		<Flex flexWrap={'wrap'} alignItems='stretch' justifyContent={'stretch'}>
			{jobsMock?.length > 0 &&
				jobsMock.sort((a, b) => {
					const aTimestamp = format(new Date(a.createdAt), 't');
					const bTimestamp = format(new Date(b.createdAt), 't');

					return parseInt(bTimestamp) - parseInt(aTimestamp);
				}) &&
				jobsMock.map((job) => <JobItem key={job.id} job={job} />)}
		</Flex>
	);
};

export default JobsList;
