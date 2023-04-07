import { CheckBox } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../../../../../../Reducer";
// import { setAgreementProperty } from "../../../../../../Reducer/Agreement";

export default function IspolDoc() {
  // const dispatch = useDispatch();
  // const agreement = useAppSelector((state) => state.Agreement);
  return (
    <>
      <FormControlLabel label="ИД" control={<CheckBox />} />
    </>
  );
}
