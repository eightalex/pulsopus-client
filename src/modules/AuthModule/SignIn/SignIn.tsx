import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { useCallback } from "react";

import Typography from "@/components/Typography";
import { EAuthSignType } from "@/constants/EAuth.ts";
import { useDispatch, useSelector } from "@/hooks";
import { actions, selectIsLoading } from "@/stores/auth";

import { signInSystemList } from "./constants.tsx";

export const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onSign = useCallback((type: EAuthSignType) => {
    if (!type) {
      throw new Error('Unexpected exception. Type cannot be empty ');
    }
    alert(`Sign with type: ${type} not implemented yet!`);
  }, []);

  const onEmailSignIn = useCallback(() => {
    dispatch(actions.setSignInEmailStage());
  }, [dispatch]);

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
            <Tooltip
              key={type}
              title={text}
              placement='top'
              arrow
            >
              <Button
                disabled={!enabled || isLoading}
                onClick={() => onSign(type)}
                size='medium'
                startIcon={<Icon/>}
                color='secondary'
              >
                <Typography variant={'text'} color='inherit'>
                  {text}
                </Typography>
              </Button>
            </Tooltip>
          );
        })}
      </Stack>

      <Tooltip
        title={'Enter user email for test login!'}
        placement='bottom'
        arrow
      >
        <Button
          disabled={isLoading}
          onClick={() => onEmailSignIn()}
          variant="text"
          sx={({ spacing }) => ({
            width: '100%',
            height: 'auto',
            padding: spacing(2),
            justifyContent: 'center',
          })}
        >
          <Typography variant="text" color='typography.success'>
            Login with email
          </Typography>
        </Button>
      </Tooltip>
    </Stack>
  );
};