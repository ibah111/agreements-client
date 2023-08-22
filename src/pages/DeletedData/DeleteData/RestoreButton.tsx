import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import restoreDeleted from "../../../api/TableApi's/restoreDeleted";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { enqueueSnackbar } from "notistack";
import { Tooltip } from "@mui/material";

interface RestoreProps {
  id_agreement: number;
}

export default function RestoreButton(props: RestoreProps) {
  return (
    <Tooltip title={"Восстановить"}>
      <GridActionsCellItem
        icon={<RestoreFromTrashIcon />}
        label="restore"
        onClick={() => {
          restoreDeleted(props.id_agreement).subscribe(() =>
            enqueueSnackbar(`Соглашение №${props.id_agreement} восстановлено`, {
              variant: "success",
              autoHideDuration: 1000,
            })
          );
        }}
      />
    </Tooltip>
  );
}
