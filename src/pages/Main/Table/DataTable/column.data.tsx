import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import DeleteIcon from "@mui/icons-material/Delete";
import { Purpose } from "../../../../api/getPurpose";
import deleteAgreement from "../../../../api/deleteAgreement";
import { enqueueSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import { dateColumnType } from "../../../../utils/DateCol";
import { RegDoc } from "../../../../api/getRegDocType";
import { Can } from "../../../../casl/casl";
import { Action, Subject } from "../../../../casl/casl.factory";
import { StatusAgreement } from "../../../../api/getStatusAgreement";
import { EventDialog } from "../Table";

interface RenderLinkProps {
  value: string;
}
function RenderLink({ value }: RenderLinkProps) {
  return (
    <>
      {value?.split?.("/")?.[0] === "https:" ? (
        <Button variant="contained" href={value} target="_blank" size="small">
          Ссылка
        </Button>
      ) : undefined}
    </>
  );
}

export default function getColumns(
  refresh: () => void,
  purposes?: Purpose[],
  regDoc?: RegDoc[],
  status?: StatusAgreement[],
  onOpenDialog?: EventTarget
) {
  const columns: GridColDef<AgreementInstance>[] = [
    { field: "id", headerName: "ID", width: 50, type: "number" },
    {
      field: "conclusion_date",
      ...dateColumnType,
      headerName: "Дата заключения",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: true,
    },
    {
      field: "finish_date",
      ...dateColumnType,
      align: "center",
      headerAlign: "center",
      headerName: "Дата завершения",
      width: 150,
      editable: true,
    },
    {
      headerName: "ID Должника",
      align: "center",
      headerAlign: "center",
      field: "personId", // parent_id = 221
      width: 100,
      editable: false,
      sortable: false,
      type: "number",
      valueGetter: (params) => params.row.Person?.id,
    },
    {
      headerName: "ФИО должника",
      headerAlign: "center",
      field: "FIO",
      sortable: false,
      width: 150,
      editable: false,
      type: "string",
      valueGetter: (params) => params.row.Person?.fio || "",
    },

    {
      headerName: "Назначение",
      align: "center",
      headerAlign: "center",
      field: "purpose",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions:
        purposes?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
    },
    {
      headerName: "Статус",
      align: "center",
      headerAlign: "center",
      field: "statusAgreement",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions:
        status?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
    },
    {
      headerName: "Долг в пользу в банка",
      align: "center",
      headerAlign: "center",
      field: "court_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      // заполняется
      headerName: "Долг в пользу НБК",
      align: "center",
      headerAlign: "center",
      field: "debt_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      // заполняется
      align: "center",
      headerAlign: "center",
      headerName: "Долг по пересчету",
      field: "recalculation_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      // заполняется
      align: "center",
      headerAlign: "center",
      headerName: "Дисконт",
      field: "discount_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      // вычисляемое
      align: "center",
      headerAlign: "center",
      headerName: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "total_dis_sum",
      width: 150,
      editable: false,
      type: "number",
      valueGetter: (params) => {
        let result = 0;
        if (params.row.recalculation_sum)
          result += params.row.recalculation_sum;
        else if (params.row.court_sum) result += params.row.court_sum;
        if (result > 0 && params.row.discount_sum)
          result -= params.row.discount_sum;
        return result;
      },
    },
    {
      headerName: "День платежа",
      align: "center",
      headerAlign: "center",
      description: "Дата платежа по соглашению",
      field: "month_pay_day",
      width: 150,
      type: "number",
    },
    {
      headerName: "Сумма платежей до соглашения",
      align: "center",
      headerAlign: "center",
      description: "Сумма платежей до соглашения",
      field: "sumBeforeAgr",
      width: 200,
      type: "number",
    },
    {
      //todo высчитывается
      align: "center",
      headerName: "Первый платеж по соглашению",
      headerAlign: "center",
      description: "Первый платеж по соглашению из контакта",
      field: "firstPayment",
      width: 200,
      type: "number",
      valueGetter: (params) => params.row.firstPayment || null,
    },
    {
      //todo высчитывается
      align: "center",
      headerName: "Дата первого платежа",
      headerAlign: "center",
      description: "Дата первого платежа",
      field: "firstPaymentDate",
      width: 250,
      type: "date",
      valueGetter: (params) => params.row.firstPaymentDate?.toDate() || null,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Последний платеж",
      description: "Последний зарег. платеж из контакта",
      field: "lastPayment",
      width: 150,
      type: "number",
      editable: false,
      valueGetter: (params) => params.row.lastPayment || null,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата посл.платежа",
      field: "c",
      type: "date",
      editable: false,
      width: 250,
      valueGetter: (params) => params.row.lastPaymentDate?.toDate() || null,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма платежей после соглашения",
      field: "sumAfterAgr",
      width: 150,
      type: "number",
      valueGetter: (params) => params.row.sumAfterAgr || null,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Наличие ИД",
      field: "new_regDoc",
      width: 150,
      type: "singleSelect",
      valueOptions:
        regDoc?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
      editable: true,
    },
    {
      field: "receipt_dt",
      ...dateColumnType,
      width: 150,
      align: "center",
      headerAlign: "center",
      headerName: "Дата получения листа",
      editable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Действия для получения или предъявления листа",
      field: "actions_for_get",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      headerAlign: "center",
      headerName: "Комментарий",
      field: "comment",
      width: 150,
      editable: true,
      type: "string",
    },

    {
      align: "center",
      headerAlign: "center",
      headerName: "Ссылка на задачу",
      field: "task_link",
      width: 150,
      editable: true,
      type: "string",
      renderCell: ({ value }) => <RenderLink value={value} />,
    },
    {
      headerAlign: "center",
      headerName: "Действия",
      align: "center",
      field: "actions",
      type: "actions",
      width: 160,
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              deleteAgreement(params.row.id).subscribe(() => {
                refresh();
                enqueueSnackbar("Удалено", { variant: "warning" });
              });
            }}
          />
        </Can>,
        <Can I={Action.Create} a={Subject.AgreementToDebt}>
          <GridActionsCellItem
            icon={<AddIcon />}
            label="AddDebt"
            onClick={() => {
              onOpenDialog?.dispatchEvent(
                new EventDialog("onOpenDialog", params.row.id)
              );
            }}
          />
        </Can>,
      ],
    },
  ];
  return columns;
}
