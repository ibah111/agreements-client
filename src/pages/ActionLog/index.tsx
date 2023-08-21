import { Grid } from "@mui/material";
import Navigation from "../index.navigation";
import LogTable from "./ActionLogData/LogTable";

export default function ActionLogIndex() {
  return (
    <Grid container height={"100vh"} direction={"column"}>
      <Navigation />
      <LogTable />
    </Grid>
  );
}
