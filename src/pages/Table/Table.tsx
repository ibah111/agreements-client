import { Box, Grid, Slide, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid-premium";

export default function AgreementTable() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  const rows = [
    { id: "", lastName: "", firstName: "", age: "" },
    { id: "", lastName: "", firstName: "", age: "" },
  ];
  return (
    <>
      <Box>
        <Grid item container alignItems="center">
          <Typography>Agreement Table</Typography>
        </Grid>

        <DataGrid rows={rows} columns={columns} />
      </Box>
    </>
  );
}
