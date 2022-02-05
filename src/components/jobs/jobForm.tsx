import React from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Box,
	Flex,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface JobFormInputProps {
	companyName: string;
	jobPosition: string;
	jobLocation: string;
	jobType: string;
	jobStatus: string;
}

const JobForm = ({ onClose }) => {
	const jobSchema = yup.object().shape({
		companyName: yup
			.string()
			.min(3, 'Company Name must be at least 3 characters')
			.required('Company Name is required'),
		jobPosition: yup
			.string()
			.min(3, 'Job Position must be at least 3 characters')
			.required('Job Position is required'),
		jobLocation: yup
			.string()
			.min(3, 'Job Location must be at least 3 characters')
			.required('Job Location is required'),
		jobType: yup.string().required('Job Type is required'),
		jobStatus: yup.string().required('Job Status is required'),
	});

	const jobFormFields = [
		{
			name: 'companyName',
			label: 'Company Name',
			type: 'text',
		},
		{
			name: 'jobPosition',
			label: 'Job Position',
			type: 'text',
		},
		{
			name: 'jobLocation',
			label: 'Job Location',
			type: 'text',
		},
		{
			name: 'jobType',
			label: 'Job Type',
			type: 'text',
		},
		{
			name: 'jobStatus',
			label: 'Job Status',
			type: 'text',
		},
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<JobFormInputProps>({
		mode: 'onBlur',
		resolver: yupResolver(jobSchema),
	});

	const onSubmit = (values: JobFormInputProps) => console.log(values);

	return (
		<Box
			as='form'
			onSubmit={handleSubmit(onSubmit)}
			bg='white'
			borderRadius={'md'}
			py={4}
			px={2}>
			<Box>
				{jobFormFields.map((jobField, index) => (
					<FormControl
						key={`${jobField.name}-${index}`}
						// @ts-ignore: Unreachable code error
						isInvalid={!!errors[jobField.name]?.message}
						// @ts-ignore: Unreachable code error
						errortext={errors[jobField.name]?.message}
						p='2'
						isRequired>
						<FormLabel>{jobField.label}</FormLabel>
						<Input
							type={jobField.type}
							// @ts-ignore: Unreachable code error
							name={jobField.name}
							// @ts-ignore: Unreachable code error
							{...register(jobField.name)}
						/>
						<FormErrorMessage>
							{/* @ts-ignore: Unreachable code error */}
							{errors[jobField.name]?.message}
						</FormErrorMessage>
					</FormControl>
				))}
			</Box>
			<Flex wrap='wrap' justify={'flex-end'} align='center' m={4}>
				<Button mr={2} onClick={onClose}>
					Cancel
				</Button>
				<Button ml={2} colorScheme={'secondary'} type='submit'>
					Submit
				</Button>
			</Flex>
		</Box>
	);
};

export default JobForm;
