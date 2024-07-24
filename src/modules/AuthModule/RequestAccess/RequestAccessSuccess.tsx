import Stack from "@mui/material/Stack";
import { useCallback } from "react";

import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { useDispatch } from "@/hooks";
import { CheckmarkIcon } from "@/icons";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { actions as authActions } from "@/stores/auth";
import { actions as popupActions } from "@/stores/popup";

import { RequestAccessResultWrapper } from './RequestAccessResultWrapper.tsx';

const subtitle = 'Thank you for your submission! We have received your request and will get back to you shortly.';
export const RequestAccessSuccess = () => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(authActions.resetStage());
    dispatch(popupActions.setClosePopup(EPopupType.AUTH));
  }, [dispatch]);


  return (
    <RequestAccessResultWrapper
      icon={<CheckmarkIcon sx={{ width: 40, height: 40 }}/>}
      header={(
        <Typography
          variant="subtitle"
          textTransform="uppercase"
          textAlign='center'
        >
          SUCCESS!
        </Typography>
      )}
      footer={(
        <>
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
        </>
      )}
    >
      <Stack paddingTop={3}>
        <Typography variant="body1">
          {subtitle}
        </Typography>
      </Stack>
    </RequestAccessResultWrapper>
  );
};