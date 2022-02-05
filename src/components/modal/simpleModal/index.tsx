import React, { FC, ReactNode } from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Divider,
} from '@chakra-ui/react';

interface SimpleModalProps {
	children: ReactNode;
	modalTitle: string;
	isOpen: boolean;
	onClose: () => void;
}
const SimpleModal: FC<SimpleModalProps> = ({
	children,
	isOpen,
	onClose,
	modalTitle,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{modalTitle}</ModalHeader>
				<ModalCloseButton />
				<Divider />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SimpleModal;
