import { Button } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import Stack from "@mui/material/Stack";
import { memo, useCallback } from 'react';

import { useDispatch, useSelector } from "@/hooks";
import { actionAuthGetStart, selectIsAuthorized } from "@/stores/auth";

export const HeaderAuth = memo(() => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleOpenAuth = useCallback(() => {
    dispatch(actionAuthGetStart());
  }, [dispatch]);

  return (
    <Stack direction='row' spacing={1}>
      <Button
        onClick={handleOpenAuth}
        variant="text"
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {isAuthorized ? 'Get started' : 'Sign in'}
      </Button>
      <Collapse orientation="horizontal" in={false && isAuthorized}>
        <Button
          onClick={handleOpenAuth}
          variant="text"
          sx={{
            textTransform: 'uppercase',
          }}
        >
          Log out
        </Button>
      </Collapse>
    </Stack>
  );
});