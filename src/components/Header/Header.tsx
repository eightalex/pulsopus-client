import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { memo, useCallback } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import api from '@/api';
import { NavLink } from '@/components/NavLink';
import { navDisabledByPath, navLabelByPath, navLinks } from "@/constants/nav.ts";
import { ROOT_ROUTE } from '@/constants/routes';
import { useDispatch, useSelector } from "@/hooks";
import { LogoIcon } from '@/icons';
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { selectIsAuthorized } from "@/stores/auth";
import { actions as popupActions } from "@/stores/popup";

const Header = memo(() => {
	const dispatch = useDispatch();
	const isAuthorized = useSelector(selectIsAuthorized);

	const handleOpenAuth = useCallback(() => {
		if(isAuthorized) {
			api.authService.redirectApp();
			return;
		}
		dispatch(popupActions.setOpenPopup(EPopupType.AUTH));
	}, [isAuthorized, dispatch]);

	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{ padding: 9 }}
		>
			<ReactRouterLink to={ROOT_ROUTE}>
				<LogoIcon sx={{ width: 202, height: 28 }}/>
			</ReactRouterLink>
			<Stack direction="row" spacing={24} alignItems="center">
				<Stack direction="row" spacing={12}>
					{navLinks
						.filter(p => Boolean(p) && !navDisabledByPath[p])
						.map((path) => (
							<NavLink
								key={path}
								to={path}
								label={navLabelByPath[path] || 'Empty label'}
								textVariant="head1"
								textSize={16}
							/>
						))}
				</Stack>
				<Button
					onClick={handleOpenAuth}
					variant="text"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					{isAuthorized ? 'Get started' : 'Sign in'}
				</Button>
			</Stack>
		</Stack>
	);
});

export default Header;
