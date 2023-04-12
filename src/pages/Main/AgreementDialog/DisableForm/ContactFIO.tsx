import { Person } from "@contact/models";
import { Grid, TextField } from "@mui/material";

interface ContactFIOProps {
  person: Person;
}

export default function ContactFIO(props: ContactFIOProps) {
  return (
    <Grid item xs={4}>
      <TextField
        disabled={true}
        label={"FIO"}
        value={props.person.fio}
        fullWidth
      />
    </Grid>
  );
}
