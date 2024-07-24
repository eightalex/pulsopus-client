import Collapse from '@mui/material/Collapse';
import Stack from "@mui/material/Stack";
import { memo, useCallback } from 'react';

import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";
import { HeaderAuthActionButton } from "@/components/Header/HeaderAuth/HeaderAuthActionButton.tsx";
import { useDispatch, useSelector } from "@/hooks";
import { ExitOutlinedIcon } from "@/icons";
import { actionAuthGetStart, onLogout, selectIsAuthorized } from "@/stores/auth";

export const HeaderAuth = memo(() => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleOpenAuth = useCallback(() => {
    dispatch(actionAuthGetStart());
  }, [dispatch]);

  const handleLogOut = useCallback(() => {
    dispatch(onLogout());
  }, [dispatch]);

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <HeaderAuthActionButton
        onClick={handleOpenAuth}
        description={isAuthorized ? 'Open application dashboard' : 'Open Sign in Dialog'}
        text={isAuthorized ? 'Get started' : 'Sign in'}
      />
      <Collapse orientation="horizontal" in={isAuthorized}>
          <ButtonIcon
            disabledActive
            onClick={handleLogOut}
            title={'Log out'}
            tooltipProps={{
              title: 'Log out',
              placement: 'bottom',
            }}
            icon={<ExitOutlinedIcon color='success'/>}
          />
      </Collapse>
    </Stack>
  );
});