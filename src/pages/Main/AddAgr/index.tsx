import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import AgreementDialog from "../AgreementDialog";
import useSearchTable from "../SearchDialog/useSearchTable";
import FormAgr from "./FormAgr";
interface AddAgrProps {
  open: boolean;
  onClose: () => void;
}

export default function AddAgr(props: AddAgrProps) {
  const [open, setOpen] = React.useState(false);
  const { refresh } = useSearchTable(setOpen);
  return (
    <>
      <Dialog open={false}>
        <DialogTitle>
          <h1>ПОЛИНА ДОБАВЬ СОГЛАШЕНИЕ!!!!!</h1>
        </DialogTitle>
        <DialogContent>
          <FormAgr refresh={refresh} />
        </DialogContent>
      </Dialog>
      <AgreementDialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </>
  );
}
