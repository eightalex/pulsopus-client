import { NavLink } from '@/components/NavLink';
import { ROOT_ROUTE } from '@/constants/routes';
import { LogoIcon } from '@/icons';
import Stack from '@mui/material/Stack';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Button } from "@mui/material";
import { navDisabledByPath, navLabelByPath, navLinks } from "@/constants/nav.ts";
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from "@/hooks";
import { getIsAuthorized } from "@/stores/auth";
import { actions as popupActions } from "@/stores/popup";
import { EPopupType } from "@/interfaces/IPopupStore.ts";

const Header = memo(() => {
	const dispatch = useDispatch();
	const isAuthorized = useSelector(getIsAuthorized);

	const handleOpenAuth = useCallback(() => {
		if(isAuthorized) {
			alert('redirect to app');
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
