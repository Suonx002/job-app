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

interface ProfileInfoInputProps {
	firstName: string;
	lastName: string;
	location: string;
}

const ProfileInformationForm: FC = () => {
	const profileSchema = yup.object().shape({
		firstName: yup
			.string()
			.max(100, 'First Name has a maximum of 100 characters')
			.required('First Name is required'),
		lastName: yup
			.string()
			.max(100, 'Last Name has a maximum of 100 characters')
			.required('Last Name is required'),
		location: yup
			.string()
			.max(100, 'Location has a maximum of 100 characters')
			.required('Location is required'),
	});

	const profileInfoFormFields = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
		},
		{
			name: 'location',
			label: 'Location',
			type: 'text',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileInfoInputProps>({
		mode: 'onBlur',
		resolver: yupResolver(profileSchema),
	});

	const onSubmit = (values: ProfileInfoInputProps) => console.log(values);

	return (
		<Box
			as='form'
			onSubmit={handleSubmit(onSubmit)}
			bg='white'
			borderRadius={'md'}
			py={8}
			px={8}>
			<Box>
				<Heading as='h3' mb={6} ml={2} color='secondary.500'>
					Profile Information
				</Heading>
				{profileInfoFormFields.map((field, index) => (
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
					ml={2}
					colorScheme={'secondary'}
					type='submit'
					whileHover={{ scale: 1.2 }}>
					Submit
				</MotionButton>
			</Flex>
		</Box>
	);
};

export default ProfileInformationForm;
