import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";
import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { loginValidationSchema } from "@/constants/scheme/loginValidationSchema.ts";
import { useDispatch, useSelector } from "@/hooks";
import { ArrowLeftIcon } from "@/icons";
import { actions, onLogin, selectIsLoading } from "@/stores/auth";

const initialValues = {
  // email: 'user@pulsopus.dev',
  email: 'admin@pulsopus.dev',
  password: 'password',
};

export const SignInEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { email: login, password } = values;
      dispatch(onLogin({
        login,
        password,
        redirect: location?.state?.from?.pathname,
      }));
    },
  });

  const isFormError = useMemo((): boolean => {
    const { email: touchedEmail } = formik.touched;
    const { email: errorEmail } = formik.errors;
    return Boolean(touchedEmail && errorEmail);
  }, [formik.errors, formik.touched]);

  const handleBack = useCallback(() => {
    dispatch(actions.resetStage());
  }, [dispatch]);

  return (
    <Stack pt={2} spacing={8}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <ButtonIcon
          disabledActive
          onClick={handleBack}
          title={'Back'}
          tooltipProps={{
            title: 'Back',
            placement: 'top',
          }}
          icon={<ArrowLeftIcon/>}
        />

        <Typography
          variant="body2"
          fontSize={20}
          textAlign='center'
          noWrap
        >
          SignIn with email
        </Typography>

      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Stack>
          <LoadingButton
            loading={isLoading}
            disabled={isFormError}
            type="submit"
            variant={'contained'}
            size='medium'
          >
            <Typography variant='text'>
              Sing in
            </Typography>
          </LoadingButton>
        </Stack>
      </form>
    </Stack>
  );
};