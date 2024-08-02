import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";

import Typography from "@/components/Typography";
import { EAuthSignType } from "@/constants/EAuth.ts";
import { useDispatch, useSelector } from "@/hooks";
import { actions, selectIsLoading } from "@/stores/auth";

import { signInSystemList } from "./constants.tsx";

export const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onEmailSignIn = useCallback(() => {
    dispatch(actions.setSignInEmailStage());
  }, [dispatch]);

  const onSign = useCallback((type: EAuthSignType) => {
    if (!type) {
      throw new Error('Unexpected exception. Type cannot be empty ');
    }
    onEmailSignIn();
  }, [onEmailSignIn]);

  return (
    <Stack pt={2} spacing={8}>
      <Typography
        variant="body2"
        fontSize={20}
        textTransform="uppercase"
        textAlign='center'
      >
        Welcome
      </Typography>
      <Stack spacing={2}>
        {signInSystemList.map(({ type, icon: Icon, enabled }) => {
          const text = `Sing in with ${type}`;
          return (
            <Button
              key={type}
              disabled={isLoading}
              onClick={() => onSign(type)}
              size='medium'
              startIcon={<Icon/>}
              color='secondary'
            >
              <Typography variant={'text'} color='inherit'>
                {text}
              </Typography>
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};