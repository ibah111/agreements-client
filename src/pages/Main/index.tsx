import { Button, Grid } from "@mui/material";
import React from "react";
import AgreementTable from "../../components/Form/Agreements/Table";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import CreateAgreementDialog from "../CreateAgreementsDialog/CreateAgreementDialog";

export default function Main() {
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
      <CreateAgreementDialog open={open} onClose={handleClose} />
    </>
  );
}
