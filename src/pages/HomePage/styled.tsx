import { styled } from '@mui/system';
import Stack, { StackProps } from "@mui/material/Stack";

export const WrapperStyled = styled(({ ...props }: StackProps) => <Stack {...props} />
)(({ theme: { breakpoints, spacing } }) => ({
	flexGrow: 1,
	justifyContent: "space-between",
	paddingLeft: spacing(39),
	[breakpoints.down('xl')]: {
		paddingLeft: spacing(22),
	},
}));

export const SubtitleWrapperStyled = styled(({ ...props }: StackProps) => <Stack {...props} />
)(({ theme: { breakpoints, spacing } }) => ({
	flexGrow: 1,
	justifyContent: "flex-end",
	padding: spacing(0, 10, 5.5, 0),
	[breakpoints.down('xxl')]: {
		display: 'none',
		visibility: 'hidden',
	},
}));
