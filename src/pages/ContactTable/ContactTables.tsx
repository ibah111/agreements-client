import { DocAttach } from "@contact/models";
import { Grid } from "@mui/material";
import { DataGridPremium, useGridApiRef } from "@mui/x-data-grid-premium";
import React from "react";
import getContactColumns from "./getContactColumns";
import Find from "./Search/Find";
interface ContactTableProps {
  id: number;
}
export default function ContactTable({ id }: ContactTableProps) {
  const [columns] = React.useState(getContactColumns());
  const [rows] = React.useState<DocAttach[]>([]);
  const apiRef = useGridApiRef();
  return (
    <>
      <Grid>
        <Find />
      </Grid>
      <Grid item xs style={{ height: 400, width: "100%" }}>
        <DataGridPremium
          columns={columns}
          rows={rows}
          apiRef={apiRef}
        ></DataGridPremium>
      </Grid>
    </>
  );
}
