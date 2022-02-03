import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

const Login = ({ onOpenRegisterModal, onCloseLoginModal }) => {
	return (
		<Flex align={'center'} justify={'center'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading color='secondary.500' fontSize={'4xl'}>
						Sign in to your account
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email address</FormLabel>
							<Input type='email' />
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input type='password' />
						</FormControl>
						<Stack spacing={10} pt={4}>
							<Stack direction={{ base: 'column', sm: 'row' }} align={'start'}>
								<Text>{`Don't have an account?`}</Text>
								<Link
									color={'secondary.400'}
									onClick={() => {
										onCloseLoginModal();
										onOpenRegisterModal();
									}}>
									Join Here
								</Link>
							</Stack>
						</Stack>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}>
								<Link color={'secondary.400'}>Forgot password?</Link>
							</Stack>
							<Button
								bg={'secondary.400'}
								color={'white'}
								_hover={{
									bg: 'secondary.500',
								}}>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Login;
