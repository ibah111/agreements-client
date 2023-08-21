import React from "react";

export default function useLogGrid() {
  const [rows, setRows] = React.useState([]);
  return { rows };
}
