import Stack from "@mui/material/Stack";
import { FC, ReactNode } from "react";
interface IRequestAccessResultWrapperProps {
  icon?: ReactNode;
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export const RequestAccessResultWrapper: FC<IRequestAccessResultWrapperProps> = (props) => {
  const { icon, header, children, footer } = props;
  return (
    <Stack pt={2} spacing={3}>

      <Stack spacing={2}>

        <Stack direction='row' spacing={1} alignItems='center'>
          {Boolean(icon) && icon}
          {header}
        </Stack>

        <Stack>
          {children}
        </Stack>

      </Stack>


      <Stack direction='row' justifyContent='space-between' alignSelf='end'>
        {footer}
      </Stack>
    </Stack>
  );
};