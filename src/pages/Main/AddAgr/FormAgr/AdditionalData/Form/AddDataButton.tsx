import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export default function AddDataButton() {
  return (
    <Button
      variant="contained"
      //TODO Изменить onClick
      onClick={async () => {
        const agreement = await {};
        if (agreement) enqueueSnackbar(agreement);
        else alert("Заполните нужные поля");
      }}
    >
      Добавить данные
    </Button>
  );
}
