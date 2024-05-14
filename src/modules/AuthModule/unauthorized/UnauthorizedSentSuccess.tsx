import Stack from "@mui/material/Stack";
import { useCallback } from "react";

import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { useDispatch } from "@/hooks";
import { CheckmarkIcon } from "@/icons";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { actions as authActions } from "@/stores/auth";
import { actions as popupActions } from '@/stores/popup';

const subtitle = 'Thank you for your submission! We have received your request and will get back to you shortly.';

export const UnauthorizedSentSuccess = () => {
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(authActions.resetStage());
        dispatch(popupActions.setClosePopup(EPopupType.AUTH));
    }, [dispatch]);

    return (
        <Stack spacing={6}>

            <Stack spacing={5}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <CheckmarkIcon sx={{ width: 40, height: 40 }}/>
                    <Typography
                        variant="subtitle"
                        textTransform="uppercase"
                        textAlign='center'
                    >
                        SUCCESS!
                    </Typography>
                </Stack>

                <Typography variant="body1">
                    {subtitle}
                </Typography>
            </Stack>


            <Stack direction='row' justifyContent='space-between' alignSelf='end'>
                <LoadingButton
                    onClick={handleClose}
                    variant={'contained'}
                    size='medium'
                >
                    <Typography
                        variant='text'
                        color='inherit'
                    >
                        Close
                    </Typography>
                </LoadingButton>
            </Stack>

            {/*<Typography*/}
            {/*    variant="text"*/}
            {/*    textTransform="uppercase"*/}
            {/*    textAlign='center'*/}
            {/*    color='success'*/}
            {/*>*/}
            {/*    Success!*/}
            {/*</Typography>*/}
            {/*<Typography variant="text" textAlign='center'>*/}
            {/*    desctiption ??*/}
            {/*</Typography>*/}
            {/*<LighthouseIcon sx={{ width: 90, height: 80 }}/>*/}
        </Stack>
    );
};