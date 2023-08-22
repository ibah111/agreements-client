import { Grid } from "@mui/material";
import Navigation from "../index.navigation";
import DeleteTable from "./DeleteData/DeleteTable";

export default function DeletedDataIndex() {
  return (
    <Grid container height={"100vh"} direction={"column"}>
      <Navigation />
      <DeleteTable />
    </Grid>
  );
}
