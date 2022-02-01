import React, { FC } from 'react';
import {
	Box,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
} from '@chakra-ui/react';
import MobileNavbar from '@src/components/navbar/mobileNavbar';
import SidebarLeftMenu from '../sidebarLeftMenu';

const SidebarWithHeader: FC = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarLeftMenu
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'>
				<DrawerContent>
					<SidebarLeftMenu onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNavbar onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	);
};

export default SidebarWithHeader;
