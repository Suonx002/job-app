import React, { FC } from 'react';

import SidebarWithHeader from './sidebarWithHeader';

const Sidebar: FC = ({ children }) => {
	return <SidebarWithHeader>{children}</SidebarWithHeader>;
};

export default Sidebar;
