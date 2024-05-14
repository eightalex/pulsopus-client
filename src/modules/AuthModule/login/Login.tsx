import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import Typography from "@/components/Typography";
import { EAuthSignType } from "@/constants/EAuth.ts";
import { useSelector } from "@/hooks";
import { GoogleIcon, MicrosoftIcon, TIcon } from '@/icons';
import { LoginForm } from "@/modules/AuthModule/login/LoginForm.tsx";
import { selectIsLoading } from "@/stores/auth";

const authSignList: { icon: TIcon; type: EAuthSignType; }[] = [
    { icon: MicrosoftIcon, type: EAuthSignType.MICROSOFT },
    { icon: GoogleIcon, type: EAuthSignType.GOOGLE },
];

export const Login = () => {
    const isLoading = useSelector(selectIsLoading);
    const onSign = (type: EAuthSignType) => {
        if(!type) {
            throw new Error('Unexpected exception. Type cannot be empty ');
        }
        alert(`Sign width ${type} no implemented!`);
    };

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
                {authSignList.map(({ type, icon: Icon }) => (
                    <Button
                        disabled={true || isLoading}
                        key={type}
                        onClick={() => onSign(type)}
                        size='medium'
                        startIcon={<Icon />}
                        color='secondary'
                    >
                        <Typography variant={'text'} color='inherit'>
                            {`Sing in with ${type}`}
                        </Typography>
                    </Button>
                ))}
            </Stack>
            <Divider>or</Divider>
            <LoginForm/>
        </Stack>
    );
};