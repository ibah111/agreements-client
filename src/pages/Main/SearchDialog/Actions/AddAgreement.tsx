import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import { Edit as EditIcon } from "@mui/icons-material";
import React from "react";
import { useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement";
import { Debt } from "@contact/models";

interface AddAgreementActionProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  debt: Debt;
}

export default function AddAgreementAction(props: AddAgreementActionProps) {
  const dispatch = useAppDispatch();

  const handleOpen = React.useCallback(() => {
    dispatch(setAgreementProperty(["r_law_act_id", props.debt.id]));
    props.setOpen(true);
  }, [dispatch, props]);

  return (
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      onClick={handleOpen}
    />
  );
}
