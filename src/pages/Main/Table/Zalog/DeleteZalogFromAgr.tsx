import { Button } from "@mui/material";
import deletePersonPropertyLink from "../../../../api/PersonPropertiesLink/deletePersonPropertyLink";
import { enqueueSnackbar } from "notistack";
import React from "react";
interface DeleteZalogFromAgrProps {
  id_agreement: number;
  id_person_property: number;
  refresh: VoidFunction;
}
export default function DeleteZalogFromAgr(props: DeleteZalogFromAgrProps) {
  const handleClick = React.useCallback(() => {
    deletePersonPropertyLink(
      props.id_agreement,
      props.id_person_property
    ).subscribe(() => {
      enqueueSnackbar(
        `Связь залога ${props.id_person_property} с соглашением ${props.id_agreement} удалена`
      );
    });
  }, [props.id_agreement, props.id_person_property]);
  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Удалить
    </Button>
  );
}
