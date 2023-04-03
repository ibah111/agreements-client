import { DocAttach } from "@contact/models";
import { Grid } from "@mui/material";
import { DataGridPremium, useGridApiRef } from "@mui/x-data-grid-premium";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../Reducer";
import { setLoadingResults, setReloadResults } from "../../Reducer/Results";
import getContactColumns from "./getContactColumns";
interface ContactTableProps {
  id: number;
}
export default function ContactTable({ id }: ContactTableProps) {
  const [columns] = React.useState(getContactColumns());
  const [rows] = React.useState<DocAttach[]>([]);
  const apiRef = useGridApiRef();
  const reload = useAppSelector((state) => state.Results.reload);
  const dispatch = useAppDispatch();
  const Click = () => {
    dispatch(setLoadingResults(true));
  };
  React.useEffect(() => {
    if (reload) {
      Click();
      dispatch(setReloadResults(false));
    }
  });
  return (
    <>
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
