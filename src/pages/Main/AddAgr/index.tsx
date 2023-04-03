import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setAgreementProperty } from "../../../Reducer/Agreement";
import { setName } from "../../../Reducer/Search";

export default function AddAgr() {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>Добавьте мировое соглашение</DialogTitle>
        <DialogContent>
          <Grid item container>
            <Grid item>
              <TextField
                size="small"
                label="Имя должника / ФИО"
                type="string"
                fullWidth
                onChange={(event) => dispatch(setName(event.target.value))}
              />
            </Grid>
            <Grid item>
              <DatePicker
                label="Дата заключения мирового соглашения"
                value={agreement.conclusion_date || null}
                onChange={(value) =>
                  dispatch(setAgreementProperty(["conclusion_date", value]))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
