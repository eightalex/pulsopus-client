import Stack from '@mui/material/Stack';
import { memo } from 'react';

import { useSelector } from "@/hooks";
import { selectIsAuthorized } from "@/stores/auth";

import { HeaderAuth } from "./HeaderAuth/HeaderAuth.tsx";
import { HeaderLogo } from "./HeaderLogo.tsx";
import { HeaderNav } from "./HeaderNav.tsx";

const Header = memo(() => {
	const isAuthorized = useSelector(selectIsAuthorized);
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{ padding: 9 }}
			spacing={4}
		>
			<HeaderLogo/>
			<Stack direction="row" spacing={isAuthorized ? 12 : 24} alignItems="center">
				<HeaderNav/>
				<HeaderAuth/>
			</Stack>
		</Stack>
	);
});

export default Header;
