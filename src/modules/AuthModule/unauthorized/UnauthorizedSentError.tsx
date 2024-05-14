import Stack from "@mui/material/Stack";
import { useCallback } from "react";

import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { EAuthStage } from "@/constants/EAuth.ts";
import { useDispatch } from "@/hooks";
import { ErrorIcon } from "@/icons/ErrorIcon.ts";
import { actions as authActions } from "@/stores/auth";

const subtitle = 'Thank you for your request. We are unable to continue the process.';
const description = 'Please try again to complete the request.';

export const UnauthorizedSentError = () => {
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(authActions.setStage(EAuthStage.REQUEST_ACCESS_STAGE));
    }, [dispatch]);

    return (
        <Stack pt={2} spacing={3}>

            <Stack spacing={2}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <ErrorIcon sx={{ width: 40, height: 40 }}/>
                    <Typography
                        variant="subtitle"
                        textTransform="uppercase"
                        textAlign='center'
                        color='typography.error'
                    >
                        ERROR!
                    </Typography>
                </Stack>

                <Typography variant="body1" >
                    {subtitle}
                </Typography>

                <Typography variant="text" >
                    {description}
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
                        Retry
                    </Typography>
                </LoadingButton>
            </Stack>
        </Stack>
    );
};