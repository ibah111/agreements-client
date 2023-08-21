import { Grid } from "@mui/material";
import Navigation from "../index.navigation";
import AdminTable from "./AdminData/AdminTable";

export default function AdminPanelIndex() {
  return (
    <Grid container height={"100vh"} direction={"column"}>
      <Navigation />
      <AdminTable />
    </Grid>
  );
}
