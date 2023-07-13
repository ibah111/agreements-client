import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import AgreementTable from "./Table/Table";

export default function Main() {
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
                  {"ПО Соглашения"}
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
