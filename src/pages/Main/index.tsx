import { Button, Grid } from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementTable from "./Table/Table";
import { Link } from "react-router-dom";
import SearchDialog from "./SearchDialog";

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
            <Button
              variant="contained"
              LinkComponent={"a"}
              href={
                "https://www.figma.com/file/ah36czN7Tt1ZTdsCuMfti3/Untitled?node-id=0-1&t=UDFSRZFVDNXKid0f-0"
              }
              target={"_blank"}
            >
              Reminder
            </Button>
          </Grid>
          <Grid item>
            <SwitchTheme />
          </Grid>
        </Grid>
        <AgreementTable />
      </Grid>
      <Grid>
        <SearchDialog open={open} onClose={handleClose} />
      </Grid>
    </>
  );
}
