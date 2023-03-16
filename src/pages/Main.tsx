import { Box, FormControlLabel, Paper, Slide, Switch } from "@mui/material";
import React from "react";
import SwitchTheme from "../components/ThemeProvider/SwitchTheme/SwitchTheme";

import AddAgreementDialog from "./Add_agreements/AddAgreement";
import AgreementTable from "./Table/Table";

const AgrTable = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <AgreementTable />
  </Paper>
);
export function TableAgreement() {}
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
          label={"Показать соглашения"}
        />
        <AddAgreementDialog />
        <SwitchTheme />
      </Box>
      <Slide direction="up" in={checked}>
        {AgrTable}
      </Slide>
    </>
  );
}
