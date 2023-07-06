import { Person } from "@contact/models";
import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";

interface BirthDateProps {
  person: Person;
}

export default function BirthDate(props: BirthDateProps) {
  return (
    <Grid item xs={2}>
      <DatePicker
        disabled={true}
        value={props.person.birth_date || null}
        label={"Дата рождения"}
      />
    </Grid>
  );
}
