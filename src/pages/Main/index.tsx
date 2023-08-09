import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import AgreementTable from "./Table/Table";
import config from "./../../config/server.json";
import React from "react";

export default function Main() {
  const slice = config.server.slice(8, -12);
  return (
    <>
      <Grid container height={"100vh"} direction={"column"}>
        <Grid sx={{}} item>
          <AppBar position="static" sx={{ height: 50 }}>
            <Toolbar>
              <Grid>
                <Typography
                  variant="h5"
                  noWrap={false}
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {`ПО Соглашения ${slice}`}
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <AgreementTable />
      </Grid>
    </>
  );
}
