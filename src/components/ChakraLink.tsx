import Link, { LinkProps } from 'next/link';
import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps;

const ChakraNextLink = ({
	href,
	prefetch = true,
	children,
	...props
}: ChakraLinkAndNextProps) => {
	return (
		<Link href={href} passHref prefetch={prefetch}>
			<ChakraLink {...props}>{children}</ChakraLink>
		</Link>
	);
};

export default ChakraNextLink;
