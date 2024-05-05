import Typography from '@/components/Typography';
import { HomePageContent } from '@/pages/HomePage/HomePageContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { observer } from 'mobx-react';
import { useStores } from "@/hooks";
import { WrapperStyled } from "./styled.tsx";

const HomePage = observer(() => {
	const { rootStore: { authStore: { handleOpenAuth } } } = useStores();
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
