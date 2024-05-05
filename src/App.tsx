import { DOCUMENTS_TITLES } from '@/constants/routes';
import { routes } from '@/routes';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { useDispatch } from "@/hooks";
import { onAuthorize } from "@/stores/auth";

const App = () => {
	const location = useLocation();
	const element = useRoutes(routes);
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = DOCUMENTS_TITLES[location.pathname] || DOCUMENTS_TITLES.ROOT_ROUTE;
	}, [location.pathname]);

	useEffect(() => {
		dispatch(onAuthorize());
	}, [dispatch]);

	return (
		<Box
			sx={({ palette: { backgroundColorPrimary, typography } }) => ({
				position: 'relative',
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: backgroundColorPrimary,
				color: typography.primary,
			})}
		>
			{element}
		</Box>
	);
};

export default App;
