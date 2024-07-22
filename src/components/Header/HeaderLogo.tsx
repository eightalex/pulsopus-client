import { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ROOT_ROUTE } from '@/constants/routes';
import { LogoIcon } from '@/icons';

export const HeaderLogo = memo(() => {
	return (
		<ReactRouterLink to={ROOT_ROUTE}>
			<LogoIcon sx={{ width: 202, height: 28 }}/>
		</ReactRouterLink>
	);
});