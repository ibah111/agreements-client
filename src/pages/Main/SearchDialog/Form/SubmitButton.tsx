import { Button, Grid } from "@mui/material";

interface SubmitButtonProps {
  refresh: VoidFunction;
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <Grid item xs={2}>
      <Button fullWidth variant="outlined" onClick={props.refresh}>
        Поиск
      </Button>
    </Grid>
  );
}
