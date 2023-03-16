import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Slide,
  Switch,
} from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AddAgreementDialog from "../Add_agreements/AddAgreement";
import AgreementTable from "../Table/Table";

export default function Main() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Grid container height={"100vh"} direction={"column"} spacing={1}>
        <Grid container item spacing={1}>
          <Grid item>
            <Button onClick={handleOpen} variant="contained">
              Открыть соглашения
            </Button>
          </Grid>
          <Grid item>
            <SwitchTheme />
          </Grid>
        </Grid>
        <AgreementTable />
      </Grid>

      <AddAgreementDialog open={open} onClose={handleClose} />
    </>
  );
}
