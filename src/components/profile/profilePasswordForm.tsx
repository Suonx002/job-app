import React, { FC } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	Box,
	Flex,
	Heading,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MotionButton } from '@src/libs/framers';

interface ProfilePasswordInputProps {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const ProfilePasswordForm: FC = () => {
	const profilePasswordFormSchema = yup.object().shape({
		currentPassword: yup
			.string()
			.max(50, 'Current Password has a maximum of 50 characters')
			.required('Current Password is required'),
		newPassword: yup
			.string()
			.max(50, 'New Password has a maximum of 50 characters')
			.required('New Password is required'),
		confirmPassword: yup
			.string()
			.max(50, 'Confirm Password has a maximum of 50 characters')
			.required('Confirm Password is required'),
	});

	const passwordFormFields = [
		{
			name: 'currentPassword',
			label: 'Current Password',
			type: 'password',
		},
		{
			name: 'newPassword',
			label: 'New Password',
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
	} = useForm<ProfilePasswordInputProps>({
		mode: 'onBlur',
		resolver: yupResolver(profilePasswordFormSchema),
	});

	const onSubmit = (values: ProfilePasswordInputProps) => console.log(values);

	return (
		<Box
			as='form'
			onSubmit={handleSubmit(onSubmit)}
			bg='white'
			borderRadius={'md'}
			py={8}
			px={8}>
			<Box>
				<Heading as='h5' mb={6} ml={2} color='secondary.500'>
					Update Password
				</Heading>
				{passwordFormFields.map((field, index) => (
					<FormControl
						key={`${field.name}-${index}`}
						// @ts-ignore: Unreachable code error
						isInvalid={!!errors[field.name]?.message}
						// @ts-ignore: Unreachable code error
						errortext={errors[field.name]?.message}
						p='2'
						isRequired>
						<FormLabel>{field.label}</FormLabel>
						<Input
							type={field.type}
							// @ts-ignore: Unreachable code error
							name={field.name}
							// @ts-ignore: Unreachable code error
							{...register(field.name)}
						/>
						<FormErrorMessage>
							{/* @ts-ignore: Unreachable code error */}
							{errors[field.name]?.message}
						</FormErrorMessage>
					</FormControl>
				))}
			</Box>
			<Flex wrap='wrap' justify={'flex-end'} align='center' m={4}>
				<MotionButton
					whileHover={{ scale: 1.2 }}
					ml={2}
					colorScheme={'secondary'}
					type='submit'>
					Submit
				</MotionButton>
			</Flex>
		</Box>
	);
};

export default ProfilePasswordForm;
