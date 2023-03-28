import { Button, Grid } from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementDialog from "./AgreementDialog";
import AgreementTable from "./Table/Table";
import { Link } from "react-router-dom";

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
            <Button variant="contained" component={Link} to={"/ActionLog"}>
              Журнал действий
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to={"/DeletedData"}>
              Удаленные данные
            </Button>
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
