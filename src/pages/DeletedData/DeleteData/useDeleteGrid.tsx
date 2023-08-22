import React from "react";

export default function useDeleteGrid() {
  const [rows, setRows] = React.useState([]);

  return { rows };
}
