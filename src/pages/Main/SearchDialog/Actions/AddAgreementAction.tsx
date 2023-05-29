import React from "react";
import { Person } from "@contact/models";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { addDebtDataInAgr } from "../../../../Reducer/Agreement/Agreement";
import DebtInstance from "../../../../Models/Debt";

interface AddAgreementActionProps {
  debt: DebtInstance;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
}

export default function AddAgreementAction({
  debt,
  setOpen,
  setPerson,
}: AddAgreementActionProps) {
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(addDebtDataInAgr(debt));
    setPerson(debt.Person!);
    setOpen(true);
  }, [debt, dispatch, setOpen, setPerson]);
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Доб.
      </Button>
    </>
  );
}
