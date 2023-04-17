import { Button, Grid } from "@mui/material";
import React from "react";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementTable from "./Table/Table";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Grid container height={"100vh"} direction={"column"}>
        <Grid
          container
          item
          spacing={1}
          style={{ marginTop: "2px" }}
          alignContent={"center"}
        >
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
    </>
  );
}
