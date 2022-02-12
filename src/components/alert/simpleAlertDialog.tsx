import React from 'react';

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';

const SimpleAlertDialog = ({
	isOpen,
	onClose,
	cancelRef,
	title,
	children,
	actionText = 'Delete',
}) => {
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>{children}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='red' onClick={onClose} ml={3}>
							{actionText}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default SimpleAlertDialog;
