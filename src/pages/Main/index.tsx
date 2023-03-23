import { Button, Grid } from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementDialog from "../../components/Form/AgreementDialog";
import AgreementTable from "../Table/Table";
import ActionLog from "../ActionLog/actionLog";

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
            <ActionLog />
          </Grid>
          <Grid item>
            <SwitchTheme />
          </Grid>
        </Grid>

        <AgreementTable />
      </Grid>
      <AgreementDialog open={open} onClose={handleClose} />
    </>
  );
}
