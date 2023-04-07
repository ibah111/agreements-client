//TODO Надо переместить и удалить
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import getPurposes from "../../../api/getPurpose";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import {
  resetAgreement,
  setAgreementProperty,
} from "../../../Reducer/Agreement/Agreement";
import useAsyncMemo from "../../../utils/asyncMemo";
import SearchDialog from "../SearchDialog";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  const purposes = useAsyncMemo(() => getPurposes(), [props.open]);
  React.useEffect(() => {
    if (!props.open) dispatch(resetAgreement());
  }, [props.open, dispatch]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => {
    setOpen(true);
    console.log("Clicked");
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>
          Запишите дополнительные данные
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("Entered");
              }
            }}
          >
            {/* <Grid xs={2} item>
              <DatePicker
                label="Дата заключения"
                value={agreement.conclusion_date || null}
                onChange={(value) =>
                  dispatch(setAgreementProperty(["conclusion_date", value]))
                }
              />
            </Grid> */}
            <Grid xs={2} item>
              <FormControl fullWidth>
                <InputLabel id="purpose-label">Назначение</InputLabel>
                <Select
                  labelId="purpose-label"
                  label="Назначение"
                  value={agreement.purpose || ""}
                  onChange={(event) =>
                    dispatch(
                      setAgreementProperty([
                        "purpose",
                        event.target.value as number,
                      ])
                    )
                  }
                >
                  {purposes?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Судебная сумма"
                value={agreement.court_sum || ""}
                type="number"
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "court_sum",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Сумма долга"
                value={agreement.debt_sum || ""}
                type="number"
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "debt_sum",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Сумма пересчета"
                value={agreement.recalculation_sum || ""}
                type="number"
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "recalculation_sum",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Дисконт"
                value={agreement.discount_sum || ""}
                type="number"
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "discount_sum",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Число платежа"
                value={agreement.month_pay_day || " "}
                inputProps={{ maxLength: 2 }}
                type="number"
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "month_pay_day",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Комментарий"
                type="string"
                value={agreement.comment || ""}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty(["comment", event.target.value])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <TextField
                label="Ссылка на задачу"
                type="string"
                value={agreement.task_link || ""}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty(["task_link", event.target.value])
                  )
                }
              />
            </Grid>
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
                      dispatch(
                        setAgreementProperty(["reg_doc", event.target.checked])
                      )
                    }
                  />
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            sx={{ width: "auto", alignSelf: "center" }}
            onClick={props.onClose}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            onClick={handleOpen}
          >
            next
          </Button>
        </DialogActions>
        <Grid item>
          <SearchDialog open={open} onClose={handleClose} />
        </Grid>
      </Dialog>
    </>
  );
}
