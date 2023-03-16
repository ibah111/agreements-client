import { Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import getAgreements from "../../api/getAgreement";
import getColumns from "./column.data";
import Rows, { Agreement } from "./row.data";

export default function AgreementTable() {
  const [agreements, setAgreements] = React.useState<Agreement[]>([]);
  function refresh() {
    getAgreements().then(setAgreements);
  }

  const columns = getColumns(refresh);
  return (
    <>
      <Box>
        <Grid item container alignItems="center" spacing={""}>
          <Typography variant="h5">Таблица соглашений</Typography>
        </Grid>
        <DataGrid columns={columns} rows={agreements} />
      </Box>
    </>
  );
}
