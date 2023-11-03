import { Button, Tooltip, Typography } from "@mui/material";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";

interface LogProps {
  setOpen: VoidFunction;
  id_agreement: number;
}
export default function ContactLogButton(props: LogProps) {
  return (
    <>
      <Tooltip
        title={
          <Typography>Показывает долги исходя из связанных долгов</Typography>
        }
      >
        <Button
          variant="outlined"
          color="warning"
          startIcon={<YoutubeSearchedForIcon />}
          onClick={() => {
            props.setOpen();
          }}
          size="small"
        >
          История должника
        </Button>
      </Tooltip>
    </>
  );
}
