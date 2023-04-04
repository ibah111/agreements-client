import { Button, Grid } from "@mui/material";
interface SubmitButtonAgrProps {
  refresh: VoidFunction;
}
export default function SubmitButtonAgr(props: SubmitButtonAgrProps) {
  return (
    <Grid item xs={2}>
      <Button fullWidth variant="contained" onClick={props.refresh}>
        Добавить соглашение
      </Button>
    </Grid>
  );
}
