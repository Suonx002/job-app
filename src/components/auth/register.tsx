import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';
import { useState } from 'react';

const Register = ({ onCloseRegisterModal, onOpenLoginModal }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Flex align={'center'} justify={'center'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading color='secondary.500' fontSize={'4xl'} textAlign={'center'}>
						Sign up
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
						<HStack>
							<Box>
								<FormControl id='firstName' isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Box>
							<Box>
								<FormControl id='lastName'>
									<FormLabel>Last Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Box>
						</HStack>
						<FormControl id='email' isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type='email' />
						</FormControl>
						<FormControl id='password' isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} />
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={'secondary.400'}
								color={'white'}
								_hover={{
									bg: 'secondary.500',
								}}>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already have an account?{' '}
								<Link
									color={'secondary.400'}
									onClick={() => {
										onCloseRegisterModal();
										onOpenLoginModal();
									}}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
