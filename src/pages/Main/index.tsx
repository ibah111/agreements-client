import { Grid } from "@mui/material";
import SwitchTheme from "../../components/ThemeProvider/SwitchTheme/SwitchTheme";
import AgreementTable from "./Table/Table";

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
            <SwitchTheme />
          </Grid>
        </Grid>
        <AgreementTable />
      </Grid>
    </>
  );
}
