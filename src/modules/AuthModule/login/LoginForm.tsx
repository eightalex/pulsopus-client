import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { LoadingButton } from "@/components/LoadingButton";
import Typography from "@/components/Typography";
import { loginValidationSchema } from "@/constants/scheme/loginValidationSchema.ts";
import { useDispatch, useSelector } from "@/hooks";
import { getIsLoading, onLogin } from '@/stores/auth';

const initialValues = {
    email: 'admin@pulsopus.com',
    password: 'admin',
};

export const LoginForm = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);

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
        const { email: touchedEmail, password: touchedPassword } = formik.touched;
        const { email: errorEmail, password: errorPassword } = formik.errors;
        return Boolean((touchedEmail && errorEmail) || (touchedPassword && errorPassword));
    }, [formik.errors, formik.touched]);

    const handleOpenForgetPassword = () => {};

    return (
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
                    <TextField
                        fullWidth
                        variant="filled"
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        disabled
                        onClick={() => handleOpenForgetPassword()}
                        variant="text"
                        sx={{
                            height: 'auto',
                            padding: 0,
                            justifyContent: 'start',
                        }}
                    >
                        <Typography variant="caption2" color='typography.success'>
                            Forgot password?
                        </Typography>
                    </Button>
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
    );
};