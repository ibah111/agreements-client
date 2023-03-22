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
import { useSnackbar } from "notistack";
import React from "react";
import createAgreement from "../../../api/createAgreement";
import getPurposes from "../../../api/getPurpose";
import { useAppDispatch, useAppSelector } from "../../../Reducer";
import { setAgreementProperty } from "../../../Reducer/Agreement";
import useAsyncMemo from "../../../utils/asyncMemo";
interface GridContainerProps {
  children: React.ReactNode[];
}
const GridContainer = ({ children }: GridContainerProps) => (
  <Grid container spacing={1}>
    {children.map((item, index) => (
      <Grid key={index} item>
        {item}
      </Grid>
    ))}
  </Grid>
);
interface CreateAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AgreementDialog(props: CreateAgreementDialogProps) {
  const dispatch = useAppDispatch();
  const agreement = useAppSelector((state) => state.Agreement);
  const { enqueueSnackbar } = useSnackbar();
  const purposes = useAsyncMemo(() => getPurposes(), [props.open]);
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>Data title</DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <GridContainer>
            <Grid>
              <TextField
                label="Номер в БД"
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
            <Grid>
              <TextField
                type={"date"}
                value={agreement.last_check_date}
                label="Дата последней проверки"
                InputLabelProps={{ shrink: true }}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "last_check_date",
                      event.target.value,
                    ])
                  )
                }
              />
            </Grid>
            <Grid>
              <TextField
                type={"date"}
                value={agreement.conclusion_date}
                label="Дата заключения"
                InputLabelProps={{ shrink: true }}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty([
                      "conclusion_date",
                      event.target.value,
                    ])
                  )
                }
              />
            </Grid>
            <FormControl>
              <InputLabel id="purpose-label">Назначение</InputLabel>
              <Select
                labelId="purpose-label"
                label="Назначение"
                value={agreement.purpose}
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
            <Grid>
              <TextField
                label="Судебная сумма"
                value={agreement.court_sum}
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
            <Grid>
              <TextField
                label="Сумма долга"
                value={agreement.debt_sum}
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
            <Grid>
              <TextField
                label="Сумма пересчета"
                value={agreement.recalculation_sum}
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
            <Grid>
              <TextField
                label="Дисконт"
                value={agreement.discount_sum}
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
            <Grid>
              <TextField
                label="Число платежа"
                value={agreement.month_pay_day}
                inputProps={{ maxLength: 2 }}
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
            <Grid>
              <FormControlLabel
                label="ИД"
                labelPlacement="top"
                control={
                  <Checkbox
                    value={agreement.reg_doc}
                    onChange={(event) =>
                      dispatch(
                        setAgreementProperty(["reg_doc", event.target.checked])
                      )
                    }
                  />
                }
              />
            </Grid>
            <Grid>
              <TextField
                label="Действия для получения листа"
                type="string"
                value={agreement.actions_for_get}
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
            <Grid>
              <TextField
                label="Комментарий"
                type="string"
                value={agreement.dsc}
                onChange={(event) =>
                  dispatch(setAgreementProperty(["dsc", event.target.value]))
                }
              />
            </Grid>
            <Grid>
              <TextField
                label="Ссылка на задачу"
                type="string"
                value={agreement.task_link}
                onChange={(event) =>
                  dispatch(
                    setAgreementProperty(["task_link", event.target.value])
                  )
                }
              />
            </Grid>
          </GridContainer>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            onClick={async () => {
              const response = await createAgreement(agreement);
              if (response) {
                enqueueSnackbar("УСПЕШНЫЙ УСПЕХ!", { variant: "success" });
              } else {
                enqueueSnackbar("Ошибка", { variant: "error" });
                return;
              }
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
