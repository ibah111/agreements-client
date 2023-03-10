import {
  Box,
  FormControlLabel,
  Paper,
  Slide,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import SwitchTheme from "../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementTable from "./Table/Table";

const AgrTable = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <AgreementTable></AgreementTable>
  </Paper>
);
export default function Main() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <>
      <Box>
        <FormControlLabel
          control={<Switch onChange={handleChange} />}
          label={"Показать таблицу соглашений"}
        />
        <SwitchTheme />
      </Box>
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        {AgrTable}
      </Slide>
    </>
  );
}
