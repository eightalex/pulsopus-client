import Stack from "@mui/material/Stack";

import Typography from "@/components/Typography";
import { LighthouseIcon } from "@/icons";

import { RequestAccessForm } from './RequestAccessForm.tsx';

const title = 'This email is not recognized as a registered user.';
const description = 'If you’re keen on kicking off with Pulsopus, just shoot a quick initiation request over to your admin. Easy as pie!';

export const RequestAccess = () => {
  return (
    <Stack pt={2} spacing={8}>
      <Stack alignItems="center">
        <LighthouseIcon sx={{ width: 90, height: 80 }}/>
      </Stack>
      <Stack spacing={8.4}>
        <Typography
          variant="text"
          textTransform="uppercase"
          textAlign='center'
        >
          {title}
        </Typography>
        <Typography variant="text">{description}</Typography>
      </Stack>
      <RequestAccessForm/>
    </Stack>
  );
};