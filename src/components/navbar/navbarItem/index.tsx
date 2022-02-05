import React, { ReactNode } from 'react';
import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import ChakraNextLink from '@src/components/ChakraLink';

interface NavItemProps extends FlexProps {
	icon: IconType;
	href: string;
	children: ReactText;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
	return (
		<ChakraNextLink
			href={href}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'secondary.400',
					color: 'white',
				}}
				{...rest}>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</ChakraNextLink>
	);
};

export default NavItem;
