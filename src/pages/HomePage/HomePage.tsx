import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { memo, useCallback } from "react";

import Typography from '@/components/Typography';
import { useDispatch, useSelector } from "@/hooks";
import { HomePageContent } from '@/pages/HomePage/HomePageContent';
import { actionAuthGetStart, selectIsAuthorized } from "@/stores/auth";

import { WrapperStyled } from "./styled.tsx";

const HomePage = memo(() => {
	const dispatch = useDispatch();

	const handleGetStart = useCallback(() => {
		dispatch(actionAuthGetStart());
	}, [dispatch]);

	return (
		<WrapperStyled>
			<Stack flexGrow={1}>
				<HomePageContent/>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="flex-end"
				sx={({ spacing }) => ({
					padding: spacing(0, 39, 37, 0)
				})}
			>
				<Typography
					variant="head2"
					textTransform="uppercase"
					component="pre"
				>
					welcome to <br/>our website
				</Typography>
				<Button
					onClick={handleGetStart}
					variant="contained"
				>
					Get started
				</Button>
			</Stack>
		</WrapperStyled>
	);
});

export default HomePage;
