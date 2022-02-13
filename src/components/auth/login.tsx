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
	useToast,
	FormErrorMessage,
	Icon,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AiFillGithub } from 'react-icons/ai';
import { GetServerSidePropsContext } from 'next';

import {
	getSession,
	getCsrfToken,
	signIn,
	getProviders,
} from 'next-auth/react';

const Login = ({
	onOpenRegisterModal,
	onCloseLoginModal,
	csrfToken,
	providers,
	session,
}) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const toast = useToast();

	const router = useRouter();

	console.log({ csrfToken, providers, session });

	const userSchema = yup.object().shape({
		email: yup.string().required('Email is required'),
		password: yup.string().required('Passwords is required'),
	});

	const userFields = [
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
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleProviderSignIn = (provider) => {
		signIn(provider.id, {
			callbackUrl: '/dashboard',
		});
	};

	const onSubmitHandler = async (values: any) => {
		setSubmitting(true);
		try {
			const loginUser = await signIn('app-login', {
				redirect: false,
				callbackUrl: '/dashboard',
				...values,
			});

			console.log({ loginUser });

			if (loginUser?.error) {
				toast({
					title: loginUser?.error || 'Something went wrong with register form.',
					status: 'error',
					position: 'top',
					isClosable: true,
				});

				setSubmitting(false);
			}

			if (loginUser?.ok) {
				// window.location.reload();
				// router.push('/dashboard');
				const session = await getSession();
				console.log({ inside: session });
				setSubmitting(false);
			}
		} catch (error) {
			toast({
				title: 'Something went wrong with register form.',
				status: 'error',
				position: 'top',
				isClosable: true,
			});
			setSubmitting(false);
		}
	};

	return (
		<Flex
			as='form'
			flexDirection={'column'}
			align={'center'}
			justify={'center'}
			onSubmit={handleSubmit(onSubmitHandler)}>
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

						<Flex p={3} flexDirection={'column'} w='100%'>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								mb={2}>
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
							<Link color={'secondary.400'} mb={2}>
								Forgot password?
							</Link>
							<Button
								isLoading={isSubmitting}
								mt={4}
								w='100%'
								type='submit'
								bg={'secondary.400'}
								color={'white'}
								_hover={{
									bg: 'secondary.500',
								}}>
								Sign in
							</Button>
						</Flex>
					</Flex>
				</Box>
			</Stack>

			{/* Github Providers */}
			<Flex flexDirection={'column'}>
				{providers?.length &&
					providers.map((provider) => {
						return (
							<Button
								key={provider}
								type='button'
								onClick={() => handleProviderSignIn(provider)}>
								<Icon as={AiFillGithub} />
								<p>{provider.name}</p>
							</Button>
						);
					})}
			</Flex>
		</Flex>
	);
};

export default Login;
