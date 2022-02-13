import React from 'react';
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	useColorModeValue,
	Text,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useDisclosure,
} from '@chakra-ui/react';
import { FiMenu, FiPlusSquare, FiChevronDown } from 'react-icons/fi';
import SimpleModal from '@src/components/modal/simpleModal';
import JobForm from '@src/components/jobs/jobForm';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const TopHeaderNavbar = ({ onOpen, ...rest }: MobileProps) => {
	const {
		isOpen: isOpenJobModal,
		onOpen: onOpenJobModal,
		onClose: onCloseJobModal,
	} = useDisclosure();

	const router = useRouter();

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize='2xl'
				fontFamily='monospace'
				fontWeight='bold'>
				Logo
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				{/* ADD NEW JOB FORM */}
				<IconButton
					size='lg'
					variant='ghost'
					aria-label='open menu'
					colorScheme={'secondary'}
					icon={<FiPlusSquare fontSize={24} />}
					onClick={onOpenJobModal}
				/>
				<SimpleModal
					isOpen={isOpenJobModal}
					onClose={onCloseJobModal}
					modalTitle='Add New Job'>
					<JobForm onClose={onCloseJobModal} />
				</SimpleModal>

				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={
										'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
									}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'>
									<Text fontSize='sm'>Justina Clark</Text>
									<Text fontSize='xs' color='gray.600'>
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}>
							<MenuItem>Jobs</MenuItem>
							<MenuItem>Profile</MenuItem>
							<MenuDivider />
							<MenuItem
								onClick={() => {
									signOut({ redirect: false });
									router.push('/');
								}}>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default TopHeaderNavbar;
