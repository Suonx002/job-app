import {
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';

import { FC } from 'react';
import Login from '../auth/login';
import Register from '../auth/register';
import SimpleModal from '../modal/authModal';

const Homepage: FC = ({ csrfToken, providers, session }) => {
	const {
		isOpen: isOpenLoginModal,
		onOpen: onOpenLoginModal,
		onClose: onCloseLoginModal,
	} = useDisclosure();
	const {
		isOpen: isOpenRegisterModal,
		onOpen: onOpenRegisterModal,
		onClose: onCloseRegisterModal,
	} = useDisclosure();

	return (
		<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={6} w={'full'} maxW={'lg'}>
					<Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
						<Text
							as={'span'}
							position={'relative'}
							color='gray800'
							_after={{
								content: "''",
								width: 'full',
								height: useBreakpointValue({ base: '20%', md: '30%' }),
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'primary.400',
								zIndex: -1,
							}}>
							Free
						</Text>
						<br />{' '}
						<Text color='primary.400' as={'span'}>
							Job Tracking App
						</Text>{' '}
					</Heading>
					<Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
						Simple online job tracker for tracking hours spent on applying to
						jobs.
					</Text>

					<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
						<Button
							onClick={onOpenLoginModal}
							rounded={'full'}
							bg={'primary.400'}
							color={'white'}
							_hover={{
								bg: 'primary.500',
							}}>
							Login / Register
						</Button>
					</Stack>

					{/* Login Modal */}
					<SimpleModal
						onOpen={onOpenLoginModal}
						onClose={onCloseLoginModal}
						isOpen={isOpenLoginModal}>
						<Login
							csrfToken={csrfToken}
							providers={providers}
							session={session}
							onCloseLoginModal={onCloseLoginModal}
							onOpenRegisterModal={onOpenRegisterModal}
						/>
					</SimpleModal>

					{/* Register Modal */}
					<SimpleModal
						onOpen={onOpenRegisterModal}
						onClose={onCloseRegisterModal}
						isOpen={isOpenRegisterModal}>
						<Register
							csrfToken={csrfToken}
							providers={providers}
							session={session}
							onCloseRegisterModal={onCloseRegisterModal}
							onOpenLoginModal={onOpenLoginModal}
						/>
					</SimpleModal>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image alt={'Login Image'} objectFit={'cover'} src='/images/hero.jpg' />
			</Flex>
		</Stack>
	);
};

export default Homepage;
