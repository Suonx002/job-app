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
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import {
	getSession,
	getCsrfToken,
	signIn,
	getProviders,
} from 'next-auth/react';

const Register = ({
	onCloseRegisterModal,
	onOpenLoginModal,
	csrfToken,
	providers,
	session,
}) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const toast = useToast();
	const router = useRouter();

	const userSchema = yup.object().shape({
		firstName: yup
			.string()
			.min(2, 'First Name must be at least 2 characters')
			.required('First Name is required'),
		lastName: yup
			.string()
			.min(2, 'Last Name must be at least 2 characters')
			.required('Last Name is required'),
		email: yup.string().required('Email is required'),
		password: yup
			.string()
			.min(6, 'Passwords must be at least 6 characters')
			.required('Passwords is required'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required('Confirm Password is required'),
	});

	const userFields = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			width: 'half',
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			width: 'half',
		},
		{
			name: 'email',
			label: 'Email Address',
			type: 'email',
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmitHandler = async (values: any) => {
		setSubmitting(true);
		try {
			const registerUser = await signIn('app-login', {
				redirect: false,
				callbackUrl: '/dashboard',
				...values,
				methodType: 'register',
			});

			if (registerUser?.error) {
				toast({
					title:
						registerUser?.error || 'Something went wrong with register form.',
					status: 'error',
					position: 'top',
					isClosable: true,
				});

				setSubmitting(false);
			}

			console.log({ registerUser });
			if (registerUser?.ok) {
				// router.push('/dashboard');
				// window.location.reload();
				setSubmitting(false);
			}
		} catch (error) {
			console.error(error);
			setSubmitting(false);
		}
	};

	return (
		<Flex
			as='form'
			align={'center'}
			justify={'center'}
			onSubmit={handleSubmit(onSubmitHandler)}>
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
					<Flex flexWrap='wrap'>
						<Input
							// @ts-ignore: Unreachable code error
							name='csrfToken'
							// @ts-ignore: Unreachable code error
							{...register('csrfToken')}
							type='hidden'
							defaultValue={csrfToken}
							hidden
						/>
						{userFields?.length &&
							userFields.map((field) => (
								<FormControl
									// @ts-ignore: Unreachable code error

									isInvalid={errors[field.name]}
									p={2}
									w={field.width === 'half' ? '50%' : '100%'}
									id={field.name}
									key={field.name}>
									<FormLabel>{field.label}</FormLabel>
									<Input
										id={field.name}
										type={field.type}
										// @ts-ignore: Unreachable code error
										name={field.name}
										// @ts-ignore: Unreachable code error
										{...register(field.name)}
									/>
									<FormErrorMessage>
										{errors[field.name]?.message}
									</FormErrorMessage>
								</FormControl>
							))}
						<Stack spacing={10} p={2} w='100%'>
							<Button
								type='submit'
								loadingText='Submitting'
								size='lg'
								bg={'secondary.400'}
								color={'white'}
								_hover={{
									bg: 'secondary.500',
								}}
								isLoading={isSubmitting}>
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
					</Flex>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
