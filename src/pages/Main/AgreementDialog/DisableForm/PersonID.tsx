import { Person } from "@contact/models";
import { Grid, TextField } from "@mui/material";

interface PersonIDProps {
  person: Person;
}

export default function PersonID(props: PersonIDProps) {
  return (
    <Grid item xs={2}>
      <TextField disabled={true} label="ID должника" value={props.person.id} />
    </Grid>
  );
}
