import { Grid } from "@mui/material";
import DateAgr from "./DateAgr";
import NameAgr from "./NameAgr";
import SubmitButtonAgr from "./SubmitButtonAgr";
interface AddAgrProps {
  refresh: VoidFunction;
}
export default function FormAgr(props: AddAgrProps) {
  return (
    <>
      <Grid container item spacing={1}>
        <NameAgr />
        <DateAgr />
      </Grid>
      <SubmitButtonAgr refresh={props.refresh} />
    </>
  );
}
