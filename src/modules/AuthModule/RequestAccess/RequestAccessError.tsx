import Stack from "@mui/material/Stack";
import { useCallback } from "react";

import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { EAuthStage } from "@/constants/EAuth.ts";
import { useDispatch } from "@/hooks";
import { ErrorIcon } from "@/icons";
import { actions as authActions } from "@/stores/auth";

import { RequestAccessResultWrapper } from './RequestAccessResultWrapper.tsx';

const subtitle = 'Thank you for your request. We are unable to continue the process.';
const description = 'Please try again to complete the request.';

export const RequestAccessError = () => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(authActions.setStage(EAuthStage.AUTH_STAGE_REQUEST_ACCESS));
  }, [dispatch]);

  return (
    <RequestAccessResultWrapper
      icon={<ErrorIcon sx={{ width: 40, height: 40 }}/>}
      header={(
        <Typography
          variant="subtitle"
          textTransform="uppercase"
          textAlign='center'
          color='typography.error'
        >
          ERROR!
        </Typography>
      )}
      footer={(
        <>
          <LoadingButton
            onClick={handleClose}
            variant={'contained'}
            size='medium'
            color='error'
          >
            <Typography
              variant='text'
              color='inherit'
            >
              Retry
            </Typography>
          </LoadingButton>
        </>
      )}
    >
      <Stack spacing={2}>
        <Typography variant="body1" >
          {subtitle}
        </Typography>

        <Typography variant="text" >
          {description}
        </Typography>
      </Stack>
    </RequestAccessResultWrapper>
  );
};