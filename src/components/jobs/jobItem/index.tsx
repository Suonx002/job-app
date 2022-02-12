import {
	Box,
	Flex,
	Heading,
	Text,
	Badge,
	Divider,
	Icon,
	ButtonGroup,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState, useRef } from 'react';
import { format } from 'date-fns';

import { FiBriefcase, FiCalendar, FiMapPin, FiEdit, FiX } from 'react-icons/fi';
import SimpleModal from '@src/components/modal/simpleModal';
import JobForm from '../jobForm';
import SimpleAlertDialog from '@src/components/alert/simpleAlertDialog';

interface JobItemProps {
	job: {
		id: number;
		companyName: string;
		jobPosition: string;
		jobStatus: string;
		jobType: string;
		jobLocation: string;
		createdAt: string;
		updatedAt: string;
		userId: number;
	};
}

interface StatusColorsProps {
	accepted: string;
	interview: string;
	pending: string;
	declined: string;
}

interface JobTypeProps {
	partTime: string;
	fullTime: string;
	internship: string;
	remote: string;
}

const JobItem: FC<JobItemProps> = ({ job }) => {
	const {
		isOpen: isOpenJobModal,
		onOpen: onOpenJobModal,
		onClose: onCloseJobModal,
	} = useDisclosure();

	const [isOpenJobAlertDialog, setIsOpenJobAlertDialog] = useState(false);
	const onCloseJobAlertDialog = () => setIsOpenJobAlertDialog(false);
	const onOpenJobAlertDialog = () => setIsOpenJobAlertDialog(true);
	const cancelRefJobAlertDialog = useRef();

	const createdAt = format(new Date(job?.createdAt), 'MMM d, yyyy');
	const statusColors: StatusColorsProps = {
		accepted: 'green.500',
		interview: 'secondary.600',
		pending: 'yellow.400',
		declined: 'red.600',
	};

	const jobTypes: JobTypeProps = {
		partTime: 'Part-Time',
		fullTime: 'Full-Time',
		internship: 'Internship',
		remote: 'Remote',
	};

	return (
		<Flex
			w={{ base: '100%', md: '50%', xl: '33.3%' }}
			justifyContent='stretch'
			alignContent={'stretch'}
			p={4}
			borderRadius='4px'
			minH={'100%'}>
			<Box bg={'white'} p={4} w='100%'>
				{/* company name & job status */}
				<Flex alignItems={'center'}>
					<Box
						p={6}
						bg='gray.500'
						borderRadius='md'
						fontWeight={'bold'}
						color='white'
						fontSize={18}>
						{job?.companyName[0]?.toUpperCase()}
					</Box>
					<Box mx={4}>
						<Heading
							as='h3'
							fontSize={19}
							color='gray.700'
							textTransform={'capitalize'}
							letterSpacing='1px'
							mb={2}>
							{job?.companyName} - {job?.jobPosition}
						</Heading>

						<Badge
							p={2}
							color='white'
							fontSize={13}
							fontWeight={'500'}
							borderRadius='12'
							bg={`${statusColors[job?.jobStatus?.toLowerCase() || 0]}`}>
							{job?.jobStatus}
						</Badge>
					</Box>
				</Flex>
				<Divider my={4} />

				{/* location, job type*/}
				<Flex flexWrap={'wrap'}>
					<Flex flexBasis={'50%'} alignItems='center' mb={3}>
						<Icon as={FiMapPin} mr={2} /> <Text>{job?.jobLocation}</Text>
					</Flex>
					<Flex flexBasis={'50%'} alignItems='center' mb={3}>
						<Icon as={FiBriefcase} mr={2} />{' '}
						<Text>{jobTypes[job?.jobType]}</Text>
					</Flex>
					<Flex flexBasis={'50%'} alignItems='center' mb={3}>
						<Icon as={FiCalendar} mr={2} /> <Text>{createdAt}</Text>
					</Flex>
				</Flex>
				<Divider my={4} />
				<Flex justify={'flex-end'} alignItems='flex-end'>
					<IconButton
						onClick={onOpenJobModal}
						aria-label='Edit Job'
						mr={2}
						variant={'outline'}
						icon={<FiEdit />}
					/>
					<IconButton
						onClick={onOpenJobAlertDialog}
						aria-label='Delete Job'
						variant={'outline'}
						icon={<FiX />}
					/>
				</Flex>

				{/* Edit Modal */}
				<SimpleModal
					isOpen={isOpenJobModal}
					onClose={onCloseJobModal}
					modalTitle='Edit Job'>
					<JobForm onClose={onCloseJobModal} />
				</SimpleModal>

				{/* Delete Modal */}
				<SimpleAlertDialog
					isOpen={isOpenJobAlertDialog}
					onClose={onCloseJobAlertDialog}
					cancelRef={cancelRefJobAlertDialog}
					title='Delete Job'>
					<Text>
						Are you sure about deleting <strong>{job?.companyName}</strong> ?
					</Text>
				</SimpleAlertDialog>
			</Box>
		</Flex>
	);
};

export default JobItem;
