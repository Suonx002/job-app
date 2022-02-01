import React, { ReactNode } from 'react';
import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Text,
	BoxProps,
} from '@chakra-ui/react';
import NavItem from '@src/components/navbar/navbarItem';
import sidebarLinks from '../sidebarLinks';
import { MotionBox } from '@src/libs/framers';

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarLeftMenu = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<MotionBox
			transition={{ type: 'spring', stiffness: 100 }}
			bg={useColorModeValue('white', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					Logo
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{sidebarLinks.map((link) => (
				<NavItem key={link.name} icon={link.icon}>
					{link.name}
				</NavItem>
			))}
		</MotionBox>
	);
};

export default SidebarLeftMenu;
