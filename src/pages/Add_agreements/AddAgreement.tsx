import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
interface GridContainerProps {
  children: React.ReactNode[];
}
const GridContainer = ({ children }: GridContainerProps) => (
  <Grid container spacing={1}>
    {children.map((item) => (
      <Grid item>{item}</Grid>
    ))}
  </Grid>
);

interface AddAgreementDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AddAgreementDialog(props: AddAgreementDialogProps) {
  const purpose = [
    {
      label: "Задолженность взыскана банком",
    },
    {
      label: "Задолженность взыскана НБК",
    },
    {
      label: "Пересчет",
    },
    {
      label: "Индексация",
    },
  ];
  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullWidth>
        <DialogTitle alignSelf={"center"}>Data title</DialogTitle>
        <Divider />
        <DialogContent sx={{ flexGrow: 1 }}>
          <GridContainer>
            <Grid>
              <TextField label="Номер в БД" type={"number"} value={"number"} />
            </Grid>
            <Grid>
              <Typography>Дата последней проверки</Typography>
            </Grid>
            <Grid>
              <TextField type={"date"} />
            </Grid>
            <Grid>
              <Typography>Дата заключения</Typography>
            </Grid>
            <TextField type={"date"} />
            <Autocomplete
              options={purpose}
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
              <TextField label="Судебная сумма" />
            </Grid>
            <Grid>
              <TextField label="Сумма долга" />
            </Grid>
            <Grid>
              <TextField label="Сумма пересчета" />
            </Grid>
            <Grid>
              <TextField label="Дисконт" />
            </Grid>
            <Grid>
              <TextField label="Число платежа" />
            </Grid>
            <Grid>
              <TextField label="Регистрационный документ" />
            </Grid>
            <Grid>
              <TextField label="Конечный документ" />
            </Grid>
            <Grid>
              <TextField label="Действия для получения листа" />
            </Grid>
            <Grid>
              <TextField label="Комментарий" />
            </Grid>
            <Grid>
              <TextField label="Ссылка на задачу" />
            </Grid>
          </GridContainer>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100", alignSelf: "center" }}
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
