import React from "react";
import { Debt, Person } from "@contact/models";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../Reducer";
import { addDebtDataInAgr } from "../../../../Reducer/Agreement/Agreement";

interface AddAgreementActionProps {
  debt: Debt;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
}

export default function AddAgreementAction(props: AddAgreementActionProps) {
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(addDebtDataInAgr(props.debt));
    props.setPerson(props.debt.Person!);
    props.setOpen(true);
  }, [dispatch, props]);

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Доб.
      </Button>
    </>
  );
}
