import { Box } from "@mui/system";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React from "react";
import getContactColumns from "./getContactColumns";

export default function ContactTable() {
  const [columns] = React.useState(getContactColumns());
  return (
    <Box>
      <DataGridPremium columns={columns} rows={[]}></DataGridPremium>
    </Box>
  );
}
