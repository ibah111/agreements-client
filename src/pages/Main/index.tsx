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
          spacing={0}
          sx={{ marginTop: "2px" }}
          alignContent={"center"}
        >
          <SwitchTheme />
        </Grid>
        <AgreementTable />
      </Grid>
    </>
  );
}
