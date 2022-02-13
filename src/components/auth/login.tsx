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
} from '@chakra-ui/react';

import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

	console.log({ session });

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
				router.push('/dashboard');
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
		</Flex>
	);
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	// if (session) {
	// 	return { redirect: { permanent: false, destination: '/dashboard' } };
	// }

	const csrfToken = await getCsrfToken({ req: context.req });
	const providers = await getProviders();
	if (providers) {
		providers.filter((provider) => {
			return provider.type !== 'credentials';
		});
	}

	return {
		props: { csrfToken, providers, session },
	};
}
