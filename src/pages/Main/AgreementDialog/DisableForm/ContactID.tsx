import { Person } from "@contact/models";
import { Grid, TextField } from "@mui/material";

interface ContactIDProps {
  person: Person;
}

export default function ContactID(props: ContactIDProps) {
  return (
    <Grid item xs={2}>
      <TextField disabled={true} label="Id контакта" value={props.person.id} />
    </Grid>
  );
}
