import { Button, Grid, Divider } from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementTable from "./Table/Table";
import { Link } from "react-router-dom";
import AddAgr from "./AddAgr";

export default function Main() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
    console.log("Clicked");
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Grid container height={"100vh"} direction={"column"}>
        <Grid container item spacing={1} style={{ marginTop: "2px" }}>
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
        <Divider />
        <AgreementTable />
      </Grid>
      <Grid>
        <AddAgr open={open} onClose={handleClose}></AddAgr>
      </Grid>
    </>
  );
}
