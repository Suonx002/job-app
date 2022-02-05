import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiBarChart2,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
	name: string;
	icon: IconType;
	href: string;
}
const sidebarLinks: Array<LinkItemProps> = [
	{ name: 'Statistics', href: '/dashboard', con: FiBarChart2 },
	{ name: 'All Jobs', href: '/all-jobs', con: FiTrendingUp },
	{ name: 'Profile', href: '/profile', con: FiSettings },
];

export default sidebarLinks;
