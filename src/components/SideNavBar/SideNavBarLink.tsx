import NavLink, { INavLinkProps } from '@/components/NavLink/NavLink';
import { SideNavBarLinkStyled } from '@/components/SideNavBar/styled';
import Typography from '@/components/Typography';
import { useWindowSize } from '@/hooks';
import { FC, memo, useMemo } from 'react';

interface ISideNavBarLinkProps extends Omit<INavLinkProps, 'children' | 'isActive'> {
	isMinimize?: boolean;
	defaultActive?: boolean;
}

export const SideNavBarLink: FC<ISideNavBarLinkProps> = memo((props) => {
	const { defaultActive, isMinimize: innerMinimize, ...restProps } = props;
	const { size: { width }, breakpointSizes } = useWindowSize();

	const isMinimize = useMemo(
		() => innerMinimize || width <= breakpointSizes.xl,
		[width, breakpointSizes, innerMinimize]);

	const iconFontSize = isMinimize ? 'large' : 'medium';

	return (
		<NavLink
			{...restProps}
			isActive={defaultActive}
		>
			{({ isActive, label, icon: Icon }) => (
				<SideNavBarLinkStyled
					spacing={3}
					direction="row"
					isActive={isActive}
					isMinimize={isMinimize}
				>
					{Boolean(Icon) && (
						<Icon color="inherit" fontSize={iconFontSize}/>
					)}
					{!isMinimize && (
						<Typography
							variant="body1"
							color="inherit"
						>
							{label?.toUpperCase()}
						</Typography>
					)}
				</SideNavBarLinkStyled>
			)}
		</NavLink>
	);
});
