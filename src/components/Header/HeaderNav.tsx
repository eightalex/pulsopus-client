import Stack from '@mui/material/Stack';
import { memo } from 'react';

import { NavLink } from '@/components/NavLink';
import { navEnabledByPath, navLabelByPath, navLinks } from "@/constants/nav.ts";

export const HeaderNav = memo(() => {
	return (
		<Stack direction="row" spacing={12}>
			{navLinks
				.filter(p => Boolean(p) && navEnabledByPath[p])
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
	);
});