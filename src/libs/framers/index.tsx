import { motion } from 'framer-motion';
import {
	Box,
	BoxProps,
	Modal,
	ModalBody,
	ModalProps,
	ModalBodyProps,
	Button,
	ButtonProps,
} from '@chakra-ui/react';

export const MotionBox = motion<BoxProps>(Box);

export const MotionModal = motion<ModalProps>(Modal);
export const MotionModalBody = motion<ModalBodyProps>(ModalBody);

export const MotionButton = motion<ButtonProps>(Button);
