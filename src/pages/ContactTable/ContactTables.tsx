import { DocAttach } from "@contact/models";
import { Box } from "@mui/system";
import { DataGridPremium, useGridApiRef } from "@mui/x-data-grid-premium";
import React from "react";
import getContactColumns from "./getContactColumns";
interface ContactTableProps {
  id: number;
}
export default function ContactTable({ id }: ContactTableProps) {
  const [columns] = React.useState(getContactColumns());
  const [rows] = React.useState<DocAttach[]>([]);
  const apiRef = useGridApiRef();
  return (
    <Box>
      <DataGridPremium
        columns={columns}
        rows={rows}
        apiRef={apiRef}
      ></DataGridPremium>
    </Box>
  );
}
