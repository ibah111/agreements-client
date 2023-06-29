import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React from "react";

export default function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    enqueueSnackbar("IN DEVELOPMENT", {
      variant: "warning",
      autoHideDuration: 1000,
      transitionDuration: 1000,
      preventDuplicate: true,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        startIcon={<AdminPanelSettingsIcon />}
        color="success"
        onClick={handleClick}
        variant="contained"
        size="small"
      >
        Admin panel
      </Button>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Admin panel</DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>
      )}
    </>
  );
}
