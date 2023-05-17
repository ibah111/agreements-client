import { Grid } from "@mui/material";

export default function RegDoc() {
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
      {/* <FormControlLabel
        label="ИД"
        control={
          <Checkbox
            value={agreement.reg_doc || ""}
            onChange={(event) =>
              dispatch(setAgreementProperty(["reg_doc", event.target.checked]))
            }
          />
        }
      /> */}
    </Grid>
  );
}
// Наличие ИД на исполнении
// Наличие ИД в регистраторе
// Наличие ИД в архиве
