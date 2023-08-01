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
    console.log(
      "id_agreement: => ",
      props.id_agreement,
      "id_pp: => ",
      props.id_person_property
    );
    deletePersonPropertyLink(
      props.id_agreement,
      props.id_person_property
    ).subscribe(() => {
      enqueueSnackbar(
        `Связь залога с соглашением ${props.id_agreement} удалена`,
        { variant: "success" }
      );
      props.refresh();
    });
  }, [props]);
  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Удалить
    </Button>
  );
}
