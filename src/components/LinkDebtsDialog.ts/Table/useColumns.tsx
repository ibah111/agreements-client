import { Debt } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import DeleteButton from "./Toolbar/DeleteButton";

export default function useColumns(agreementId: number, refresh: VoidFunction) {
  return React.useMemo<GridColDef<Debt>[]>(
    () => [
      {
        // ? main debt key
        align: "center",
        headerAlign: "center",
        headerName: "ID долга",
        field: "id",
        width: 100,
        type: "number",
      },
      {
        // ? person key
        align: "center",
        headerAlign: "center",
        headerName: "ID должника",
        field: "parent_id",
        width: 100,
        type: "number",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "contract",
        headerName: "№ КД",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "start_sum",
        headerName: "Начальная сумма",
        description: "Начальная сумма, необходимая к погашению (не изменяется)",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 200,
        field: "Delete",
        headerName: "Удалить связь",
        description: "Удалить",
        type: "actions",
        getActions: (params) => [
          <DeleteButton
            debtId={params.row.id}
            agreementId={agreementId}
            refresh={refresh}
          />,
        ],
      },
    ],
    [agreementId, refresh]
  );
}
