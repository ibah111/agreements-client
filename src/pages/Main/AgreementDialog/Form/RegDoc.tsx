import { Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../Reducer";
import { setAgreementProperty } from "../../../../Reducer/Agreement/Agreement";

export default function RegDoc() {
  const agreement = useAppSelector((state) => state.Agreement);
  const dispatch = useAppDispatch();
  return (
    <Grid
      xs={2}
      item
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControlLabel
        label="ИД"
        control={
          <Checkbox
            value={agreement.reg_doc || ""}
            onChange={(event) =>
              dispatch(setAgreementProperty(["reg_doc", event.target.checked]))
            }
          />
        }
      />
    </Grid>
  );
}
