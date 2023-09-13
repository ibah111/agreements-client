import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import { Refresh } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import syncOne from "../../../../../api/Preview/syncOne";

interface UpdateButtonProps {
  id_agreement: number;
  refresh: VoidFunction;
}

export default function SyncOneIcon(props: UpdateButtonProps) {
  return (
    <>
      <GridActionsCellItem
        label="update"
        size="small"
        color="inherit"
        icon={<Refresh />}
        onClick={() => {
          syncOne(props.id_agreement).subscribe(() => {
            enqueueSnackbar(`Соглашение ${props.id_agreement} обновлено`, {
              variant: "success",
            });
            props.refresh();
          });
        }}
      />
    </>
  );
}
