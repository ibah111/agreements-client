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
            <SwitchTheme />
          </Grid>
        </Grid>
        <AgreementTable />
      </Grid>
    </>
  );
}
