import { Grid, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../Reducer";
import { setAgreementProperty } from "../../../../../Reducer/Agreement/Agreement";
import useAgreementData from "../../../../../Hooks/useAgreementData";
import React from "react";
import { NumericFormatCustom } from "./CustomMathComponent";

export default function Sum() {
  const dispatch = useAppDispatch();
  const full_req = useAppSelector((state) => state.Agreement.full_req);
  const data = useAgreementData("sum", { full_req });
  return (
    <Grid xs={2} item>
      <TextField
        label="Сумма с дисконтом"
        onChange={(event) =>
          dispatch(
            setAgreementProperty([
              "sum",
              event.target.value ? Number(event.target.value) : 0,
            ])
          )
        }
        value={data.value}
        required={data.required}
        error={data.error}
        helperText={data.helperText}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          inputComponent: NumericFormatCustom as any,
        }}
      />
    </Grid>
  );
}
