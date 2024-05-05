import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@/components/Typography";
import { LoginForm } from "@/modules/AuthModule/login/LoginForm.tsx";
import Button from "@mui/material/Button";
import { GoogleIcon, MicrosoftIcon, TIcon } from '@/icons';
import { EAuthSignType } from "@/constants/EAuth.ts";
import { getIsLoading } from "@/stores/auth";
import { useSelector } from "@/hooks";

const authSignList: { icon: TIcon; type: EAuthSignType; }[] = [
    { icon: MicrosoftIcon, type: EAuthSignType.MICROSOFT },
    { icon: GoogleIcon, type: EAuthSignType.GOOGLE },
];

export const Login = () => {
    const isLoading = useSelector(getIsLoading);
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