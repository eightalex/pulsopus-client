import Typography, { ITypographyProps } from '@/components/Typography';
import { PlusIcon } from '@/icons';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SubtitleWrapperStyled } from "@/pages/HomePage/styled.tsx";

const subtext = 'Pulsopus is a tailored employee management platform for IT and software companies.It identifies burnout, boosts motivation, and streamlines team management for Project Managers, Delivery Manager, Operation Managers, HR and People Partners.';

const STATE_COUNT = 3;
const STATE_TRANSITION = 800;
const START_STATE_TIMEOUT = 600;
const CHANGE_STATE_TIMEOUT = STATE_TRANSITION + START_STATE_TIMEOUT;

const transitionStyle = `opacity ${STATE_TRANSITION}ms ease-in`;

const HeadTypography: FC<ITypographyProps & { text: string, showBlock?: boolean }> = (props) => {
	const {
		text = '',
		showBlock = false,
		...restProps
	} = props;
	return (
		<Typography
			{...restProps}
			variant="head1"
			fontSize={120}
			lineHeight="125%"
			noWrap
			sx={{
				opacity: showBlock ? 1 : 0,
				transition: transitionStyle,
			}}
		>
			{text}
		</Typography>
	);
};

export const HomePageContent = () => {
	const interval = useRef<ReturnType<typeof setInterval>>();
	const [state, setState] = useState<number>(0);

	const clearStateInterval = useCallback(() => {
		if (interval && interval.current) {
			clearInterval(interval.current);
		}
	}, [interval]);

	const handleSetStateInterval = useCallback(() => {
		new Promise((resolve) => {
			const t = setTimeout(() => {
				clearTimeout(t);
				resolve(t);
			}, START_STATE_TIMEOUT);
		}).then(() => {
			setState(1);
			clearStateInterval();
			interval.current = setInterval(() => {
				setState(prev => {
					if (prev > STATE_COUNT) {
						clearStateInterval();
						return prev;
					}
					return prev + 1;
				});
			}, CHANGE_STATE_TIMEOUT);
		});
	}, [clearStateInterval]);

	useEffect(() => {
		handleSetStateInterval();
		return () => {
			setState(0);
			clearStateInterval();
		};
	}, [handleSetStateInterval, clearStateInterval]);

	return (
		<Stack
			flexGrow={1}
			justifyContent='center'
		>
			<Stack direction='row' spacing={4.5}>
				<Stack sx={{ position: 'relative' }} flexShrink={0} flexBasis='61%'>
					<Box
						sx={({ extendPalette: { iconColorSuccess } }) => ({
							position: 'absolute',
							top: '25%',
							left: -26,
							width: 22,
							height: 22,
							backgroundColor: iconColorSuccess,
							borderRadius: '2px',
							transform: 'translate(-100%, -50%)'
						})}
					/>
					<HeadTypography
						text={'CREATED'}
						flexShrink={0}
						showBlock
					/>
					<HeadTypography
						text={'TO ASSIST'}
						flexShrink={0}
						showBlock={state > 0}
					/>
				</Stack>
				<SubtitleWrapperStyled>
					<Box>
						<Typography
							alignItems='end'
							variant={'body2'}
							lineHeight={'140%'}
							component="pre"
							sx={{ textWrap: 'wrap' }}
						>
							{subtext}
						</Typography>
					</Box>
				</SubtitleWrapperStyled>
			</Stack>

			<Stack
				direction="row"
				alignItems="center"
				spacing={36}
			>
				<HeadTypography
					text={'YOU'}
					showBlock={state > 1}
				/>
				<Stack
					direction="row"
					spacing={12.5}
					flexGrow={1}
					alignItems="center"
				>
					<PlusIcon
						color={'success'}
						fontSize={'extraLarge'}
						sx={{ opacity: state > 2 ? 1 : 0, transition: transitionStyle }}
					/>
					<Box
						sx={({ extendPalette: { iconColorPrimary } }) => ({
							width: 'auto',
							height: 2,
							backgroundColor: iconColorPrimary,
							flexGrow: 1,
						})}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};
