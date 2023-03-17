import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import createAgreement from "../../api/createAgreement";
import getPurposes, { Purpose } from "../../api/getPurpose";
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

export default function CreateAgreementDialog(
  props: CreateAgreementDialogProps
) {
  const [lawActId, setLawActId] = React.useState(1);
  const [lastCheckDate, setLastCheckDate] = React.useState(Date);
  const [conclusionDate, setConclusionDate] = React.useState(Date);
  const [purposes, setPurposes] = React.useState<Purpose[]>([]);
  const [courtSum, setCourtSum] = React.useState(1);
  const [debtSum, setDebtSum] = React.useState(1);
  const [recalculationSumm, setRecalculationSumm] = React.useState(1);
  const [discount, setDiscount] = React.useState(1);
  const [payDayMonth, setPayDayMonth] = React.useState(1);
  const [regDoc, setRegDoc] = React.useState("");
  const [actionForGet, setActionForGet] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [taskLink, setTaskLink] = React.useState("");
  React.useEffect(() => {
    if (props.open)
      getPurposes().then((res) => {
        setPurposes(res);
      });
  }, [props.open]);

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
                value={lawActId}
                onChange={(event) => setLawActId(Number(event.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                type={"date"}
                value={lastCheckDate}
                label="Дата последней проверки"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setLastCheckDate(event.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                type={"date"}
                value={conclusionDate}
                label="Дата заключения"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setConclusionDate(event.target.value)}
              />
            </Grid>
            <Autocomplete
              options={purposes.map((purpose) => {
                return { title: purpose.title, value: purpose.id };
              })}
              getOptionLabel={(value) => {
                return value.title;
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Назначение"
                  sx={{
                    alignSelf: "center",
                  }}
                />
              )}
            />
            <Grid>
              <TextField
                label="Судебная сумма"
                value={courtSum}
                type="number"
                onChange={(event) => setCourtSum(Number(event.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                label="Сумма долга"
                value={debtSum}
                type="number"
                onChange={(event) => setDebtSum(Number(event.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                label="Сумма пересчета"
                value={recalculationSumm}
                type="number"
                onChange={(event) =>
                  setRecalculationSumm(Number(event.target.value))
                }
              />
            </Grid>
            <Grid>
              <TextField
                label="Дисконт"
                value={discount}
                type="number"
                onChange={(event) => setDiscount(Number(event.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                label="Число платежа"
                value={payDayMonth}
                type="number"
                onChange={(event) => setPayDayMonth(Number(event.target.value))}
              />
            </Grid>
            <Grid>
              <TextField
                label="Исполнительный документ"
                value={regDoc}
                type="string"
                onChange={(event) => setRegDoc(event.target.value)}
              />
            </Grid>
            {/*             
            <Grid>
              <TextField label="Конечный документ" />
            </Grid> */}
            <Grid>
              <TextField
                label="Действия для получения листа"
                type="string"
                value={actionForGet}
                onChange={(event) => setActionForGet(event.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                label="Комментарий"
                type="string"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                label="Ссылка на задачу"
                type="string"
                value={comment}
                onChange={(event) => setTaskLink(event.target.value)}
              />
            </Grid>
          </GridContainer>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
            // onClick={async () => {
            //   const agreement = await createAgreement({
            //     r_law_act_id: string,
            //   });
            //   if (agreement) agreement;
            //   else alert("Error");
            // }}
          >
            Send
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
