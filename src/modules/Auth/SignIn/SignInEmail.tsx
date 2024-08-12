import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";

import ButtonIcon from "@/components/ButtonIcon/ButtonIcon.tsx";
import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { loginValidationSchema } from "@/constants/scheme/loginValidationSchema.ts";
import { useDispatch, useSelector } from "@/hooks";
import { ArrowLeftIcon } from "@/icons";
import { actions, onLogin, selectIsLoading } from "@/stores/auth";

const initialValues = {
  // user@pulsopus.dev | admin@pulsopus.dev',
  email: '1111user@pulsopus.dev',
};

export const SignInEmail = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { email: login } = values;
      dispatch(onLogin({ login }));
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
    <Stack pt={2} spacing={7}>
      <Stack direction='row' position='relative' justifyContent='center'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
          }}
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
        </Box>
        <Typography
          variant="body2"
          fontSize={20}
          textTransform="uppercase"
          textAlign='center'
        >
          Enter Email
        </Typography>
      </Stack>

      <form onSubmit={formik.handleSubmit} autoComplete='off'>
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