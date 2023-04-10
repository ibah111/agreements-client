import React from "react";
import { useAppSelector } from "../../../../Reducer";
import { Debt } from "@contact/models";
import { Button } from "@mui/material";
import createAgreement from "../../../../api/createAgreement";
import { enqueueSnackbar } from "notistack";

interface AddAgreementActionProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  debt: Debt;
}

export default function AddAgreementAction(props: AddAgreementActionProps) {
  //todo Функция сохранения id при переходе на редакт согласа
  const agreement = useAppSelector((state) => state.Agreement);
  return (
    <Button
      variant="contained"
      onClick={async () => {
        await createAgreement(agreement);
        enqueueSnackbar("Успешно создано", { variant: "success" });
      }}
    >
      Доб.
    </Button>
  );
}
