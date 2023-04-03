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
import { DatePicker } from "@mui/x-date-pickers-pro";
import { useSnackbar } from "notistack";
import React from "react";
import createAgreement from "../../../api/createAgreement";
import getPurposes from "../../../api/getPurpose";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import {
  resetAgreement,
  setAgreementProperty,
} from "../../../Reducer/Agreement";
import useAsyncMemo from "../../../utils/asyncMemo";
// import ContactTable from "../../ContactTable/ContactTables";
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  const { enqueueSnackbar } = useSnackbar();
  const purposes = useAsyncMemo(() => getPurposes(), [props.open]);
  React.useEffect(() => {
    if (!props.open) dispatch(resetAgreement());
  }, [props.open, dispatch]);
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>
          Внесите или выберите контакта
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
            <Grid xs={2} item>
              <TextField
                label="Номер в БД"
                disabled
                type="number"
                value={agreement.r_law_act_id || ""}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "r_law_act_id",
                      Number(event.target.value),
                    ])
                  )
                }
              />
            </Grid>
            <Grid xs={2} item>
              <DatePicker
                label="Дата заключения"
                value={agreement.conclusion_date || null}
                onChange={(value) =>
                  dispatch(setAgreementProperty(["conclusion_date", value]))
                }
              />
            </Grid>
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
                value={agreement.month_pay_day || ""}
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
                label="Действия для получения листа"
                type="string"
                value={agreement.actions_for_get || ""}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "actions_for_get",
                      event.target.value,
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
        {/* <Grid item container>
          <ContactTable id={0} />
        </Grid> */}
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            onClick={async () => {
              await createAgreement(agreement);
              enqueueSnackbar("Успешно создано", { variant: "success" });
            }}
          >
            Отправить
          </Button>
          <Button
            variant="contained"
            sx={{ width: "auto", alignSelf: "center" }}
            onClick={props.onClose}
          >
            Закрыть окно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
