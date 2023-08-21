import React from "react";

export default function useAdminGrid() {
  const [rows, setRows] = React.useState([]);
  return { rows };
}
