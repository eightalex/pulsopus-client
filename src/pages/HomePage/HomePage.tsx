import Typography from '@/components/Typography';
import { HomePageContent } from '@/pages/HomePage/HomePageContent';
import { useDispatch } from "@/hooks";
import { memo, useCallback } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { actions } from '@/stores/popup';
import { WrapperStyled } from "./styled.tsx";
import { EPopupType } from "@/interfaces/IPopupStore.ts";

const HomePage = memo(() => {
	const dispatch = useDispatch();
	
	const handleOpenAuth = useCallback(() => {
		dispatch(actions.setOpenPopup(EPopupType.AUTH));
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
					onClick={handleOpenAuth}
					variant="contained"
				>
					Get started
				</Button>
			</Stack>
		</WrapperStyled>
	);
});

export default HomePage;
