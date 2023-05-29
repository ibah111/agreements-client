import { Debt } from "@contact/models";
import { GridColDef } from "@mui/x-data-grid-premium";
import React from "react";
import DeleteButton from "./Toolbar/DeleteButton";
import PaymentsButton from "./Toolbar/Payments/PaymentsButton";
//import PaymentsButton from "./Toolbar/Payments/PaymentsButton";

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
        width: 150,
        field: "name",
        headerName: "Название продукта",
      },
      {
        align: "center",
        headerAlign: "center",
        field: "status",
        headerName: "Статус долга",
        width: 150,
        valueGetter: (params) => {
          // ебать я дебил да? я просто не смог вызвать ДИКТы с сервера)))
          if (params.row?.status === 1)
            return "Не распределен" || params.row?.status;
          if (params.row?.status === 2)
            return "Не обработан" || params.row?.status;
          if (params.row?.status === 3) return "Отказ" || params.row?.status;
          if (params.row?.status === 4)
            return "Контакт установлен" || params.row?.status;
          if (params.row?.status === 5) return "Обещание" || params.row?.status;
          if (params.row?.status === 6)
            return "Завершено" || params.row?.status;
          if (params.row?.status === 7)
            return "Аннулировано" || params.row?.status;
          if (params.row?.status === 8)
            return "Отозван клиентом" || params.row?.status;
          if (params.row?.status === 9)
            return "Проблемный" || params.row?.status;
          if (params.row?.status === 10)
            return "Обещание" || params.row?.status;
          if (params.row?.status === 11)
            return "Возврат в работу" || params.row?.status;
          if (params.row?.status === 12)
            return "Без перспектив" || params.row?.status;
          if (params.row?.status === 13)
            return "Контак не установлен" || params.row?.status;
          if (params.row?.status === 14)
            return "Аутсорсинг" || params.row?.status;
          if (params.row?.status === 15)
            return "Поиск информации" || params.row?.status;
          if (params.row?.status === 16)
            return "Возврат из аутсорсинга" || params.row?.status;
          if (params.row?.status === 17) return "Цессия" || params.row?.status;
          if (params.row?.status === 103)
            return "Погашен с пересчетом" || params.row?.status;
          if (params.row?.status === 104)
            return "Банкрот, освобожден" || params.row?.status;
          if (params.row?.status === 105)
            return "Умер, наследников нет" || params.row?.status;
          if (params.row?.status === 106)
            return (
              "Нет перспектив юридического взыскания" || params.row?.status
            );
          if (params.row?.status === 107)
            return "Сумма меньше 3 000 руб" || params.row?.status;
          if (params.row?.status === 108)
            return "Мошенничество подтверждено" || params.row?.status;
          if (params.row?.status === 109)
            return "Авто реализовано" || params.row?.status;
          if (params.row?.status === 110)
            return "Погашен" || params.row?.status;
          if (params.row?.status === 111)
            return "Оплата по графику" || params.row?.status;
          if (params.row?.status === 112)
            return "Банкрот в процедуре" || params.row?.status;
          if (params.row?.status === 113)
            return "Банкрот не освобожден" || params.row?.status;
          if (params.row?.status === 114)
            return "Умер, есть наследство" || params.row?.status;
          if (params.row?.status === 115)
            return "Погашен, в архив" || params.row?.status;
          if (params.row?.status) return params.row?.status;
        },
      },
      {
        align: "center",
        headerAlign: "center",
        width: 150,
        field: "dsc",
        headerName: "Комментарий",
      },
      {
        align: "center",
        headerAlign: "center",
        width: 200,
        field: "Payments",
        headerName: "Платежи",
        description: "Платежи",
        type: "actions",
        getActions: (params) => [
          <PaymentsButton
            debtId={params.row.id}
            refresh={refresh}
            onClose={false}
          />,
        ],
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
