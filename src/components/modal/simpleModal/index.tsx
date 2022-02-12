import React, { FC, ReactNode, useState } from 'react';

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
	const [overlayExpand, setOverlayExpand] = useState(false);

	const overlayExpandTimer = () => {
		setOverlayExpand(true);

		setTimeout(() => {
			setOverlayExpand(false);
		}, 500);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={false}
			onOverlayClick={overlayExpandTimer}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color='secondary.500'>{modalTitle}</ModalHeader>
				<ModalCloseButton
					color={overlayExpand ? 'primary.500' : ''}
					transform={overlayExpand ? 'scale(1.5)' : ''}
				/>
				<Divider />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SimpleModal;
