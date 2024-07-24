import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { FC } from 'react';
interface IHeaderAuthActionButtonProps {
  onClick: () => void;
  description: string;
  text?: string;
}

export const HeaderAuthActionButton: FC<IHeaderAuthActionButtonProps> = (props) => {
  const { onClick, description, text } = props;
  return (
    <Tooltip
      title={description}
      placement="bottom"
      arrow
    >
      <Button
        onClick={onClick}
        variant="text"
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {text}
      </Button>
    </Tooltip>
  );
};