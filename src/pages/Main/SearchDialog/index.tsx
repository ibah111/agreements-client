import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import AgreementDialog from "../AgreementDialog";
import Form from "./Form";
import Table from "./Table";
import useSearchTable from "./useSearchTable";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog(props: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { loading, refresh, rows, columns } = useSearchTable(setOpen);
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md">
        <DialogTitle>Форма поиска</DialogTitle>
        <DialogContent>
          <Grid container direction={"column"} sx={{ height: "70vh" }}>
            <Grid item container alignItems={"center"} spacing={1} xs={1}>
              <Form refresh={refresh} />
            </Grid>
            <Grid item xs style={{ height: 400, width: "100%" }}>
              <Table columns={columns} loading={loading} rows={rows} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <AgreementDialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        // onClick={async () => {
        //   await createAgreement(agreement);
        //   enqueueSnackbar("Успешно создано", { variant: "success" });
        // }}
      />
    </>
  );
}
