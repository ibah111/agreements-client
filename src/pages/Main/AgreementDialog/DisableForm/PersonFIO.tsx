import { Person } from "@contact/models";
import { Grid, TextField } from "@mui/material";

interface PersonFIOProps {
  person: Person;
}

export default function PersonFIO(props: PersonFIOProps) {
  return (
    <Grid item xs={4}>
      <TextField
        disabled={true}
        label={"ФИО"}
        value={props.person.fio}
        fullWidth
      />
    </Grid>
  );
}
