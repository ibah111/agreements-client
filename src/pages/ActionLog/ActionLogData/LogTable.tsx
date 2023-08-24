import { DataGridPremium } from "@mui/x-data-grid-premium";
import columnsActionLog from "./column.actionLog";
import useLogGrid from "./useLogGrid";
import LogToolbar from "./LogToolbar";
import { Grid } from "@mui/material";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

export default function LogTable() {
  const cols = columnsActionLog();
  const { ...logTableProps } = useLogGrid();
  return (
    <Grid
      item
      xs
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGridPremium
        {...logTableProps}
        columns={cols}
        pagination
        slots={{
          toolbar: LogToolbar,
          pagination: CustomPagination,
        }}
        paginationMode="server"
        filterMode="server"
        sortingMode="server"
      />
    </Grid>
  );
}
