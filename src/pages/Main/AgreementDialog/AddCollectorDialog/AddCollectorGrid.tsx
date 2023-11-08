import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import {
  DataGridPremium,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid-premium";
import React from "react";
import useSearchUser from "./useSearchUser";
import { User } from "@contact/models";
import getName from "../../../../Reducer/getName";
import AddIcon from "@mui/icons-material/Add";

interface CollectorDialogProps {
  open: boolean;
  onClose: VoidFunction;
}

export default function AddCollectiorDialog({
  onClose,
  open,
}: CollectorDialogProps) {
  const cols = useColumns();
  const [fio, setFio] = React.useState<string>("");
  const { loading, rows, search } = useSearchUser({
    fio,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <DialogTitle>Добавить взыскателя</DialogTitle>
      <DialogContent>
        <Grid container direction={"column"} sx={{ height: "60vh" }}>
          <Grid item container alignItems={"center"} xs={1} spacing={1}>
            <Grid item xs={6}>
              <TextField
                label="ФИО"
                size="small"
                value={fio}
                onChange={(event) => {
                  setFio(event.target.value as string);
                  search();
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs
            sx={{
              height: 300,
              width: "100%",
            }}
          >
            <DataGridPremium loading={loading} columns={cols} rows={rows} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

function useColumns() {
  const columns: GridColDef<User>[] = [
    {
      field: "id_contact",
      headerName: "ID в КСК",
      valueGetter(params) {
        return params.row.id;
      },
    },
    {
      field: "fio",
      headerName: "ФИО",
      valueGetter(params) {
        const p = params.row;
        return getName(p.f, p.i, p.o) || "";
      },
    },
    {
      field: "department_name",
      headerName: "Департамент / Отдел",
      valueGetter(params) {
        return params.row.Department?.name || "Департамен не указан";
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      type: "actions",
      getActions: () => [
        <GridActionsCellItem
          icon={<AddIcon />}
          onClick={() => {}}
          label="collector-label"
        />,
      ],
    },
  ];
  return columns.map<GridColDef<User>>((items) => ({
    ...items,
    headerAlign: "center",
    align: "center",
    width: 150,
  }));
}
