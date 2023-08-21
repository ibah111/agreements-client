import { Grid } from "@mui/material";
import AgreementTable from "./Table/Table";
import Navigation from "../index.navigation";

export default function Main() {
  return (
    <>
      <Grid container height={"100vh"} direction={"column"}>
        <Navigation />
        <AgreementTable />
      </Grid>
    </>
  );
}
