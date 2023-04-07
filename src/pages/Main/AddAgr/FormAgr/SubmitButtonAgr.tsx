import { Button, Grid } from "@mui/material";
import React from "react";
import AgreementDialog from "../../AgreementDialog";
interface SubmitButtonAgrProps {
  refresh: VoidFunction;
}
export default function SubmitButtonAgr(props: SubmitButtonAgrProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
    console.log("Opened AggrementDialog");
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Grid item xs={"auto"}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleOpen}
          disabled={false}
          style={{ color: "black" }}
        >
          Добавить соглашение
        </Button>
      </Grid>
      <AgreementDialog open={open} onClose={handleClose} />
    </>
  );
}
