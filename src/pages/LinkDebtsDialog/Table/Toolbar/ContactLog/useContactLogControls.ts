import React from "react";

export default function useContactLogControls() {
  const [openCl, setOpen] = React.useState<boolean>(false);

  const openContactLog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeContactLog = React.useCallback(() => {
    setOpen(false);
  }, []);

  return {
    openCl,
    openContactLog,
    closeContactLog,
  };
}
