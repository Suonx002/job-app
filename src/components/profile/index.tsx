import { Box, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import ProfileInformationForm from './profileInformationForm';
import ProfilePasswordForm from './profilePasswordForm';

const Profile: FC = () => {
	return (
		<Flex direction={'column'} p={4}>
			<Box m={4}>
				<ProfileInformationForm />
			</Box>
			<Box m={4}>
				<ProfilePasswordForm />
			</Box>
		</Flex>
	);
};

export default Profile;
