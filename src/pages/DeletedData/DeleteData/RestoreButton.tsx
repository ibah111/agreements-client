import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import RestoreIcon from "@mui/icons-material/Restore";
import restoreDeleted from "../../../api/TableApi's/restoreDeleted";
import { enqueueSnackbar } from "notistack";
interface RestoreProps {
  id_agreement: number;
}
export default function RestoreButton(props: RestoreProps) {
  return (
    <GridActionsCellItem
      icon={<RestoreIcon />}
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
  );
}
