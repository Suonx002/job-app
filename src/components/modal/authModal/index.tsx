import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';
import { MotionModal, MotionModalBody } from '@src/libs/framers';

const AuthModal = ({ children, isOpen, onClose }) => {
	return (
		<>
			<MotionModal
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{/* <ModalHeader>Modal Title</ModalHeader> */}
					<ModalCloseButton />
					<MotionModalBody
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						{children}
					</MotionModalBody>
				</ModalContent>
			</MotionModal>
		</>
	);
};

export default AuthModal;
