import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
	const { data: session, status } = useSession();

	const router = useRouter();
	// useEffect(() => {
	// 	if (!session) {
	// 		router.push('/');
	// 	}
	// }, []);

	console.log({ session, status });
	return <div>hello dashboard</div>;
};

export default Dashboard;
