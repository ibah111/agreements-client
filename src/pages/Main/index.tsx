import { Grid } from "@mui/material";
import AgreementTable from "./Table/Table";

export default function Main() {
  return (
    <>
      <Grid container height={"100vh"} direction={"column"}>
        <AgreementTable />
      </Grid>
    </>
  );
}
