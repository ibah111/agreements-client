import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import DeleteIcon from "@mui/icons-material/Delete";
import { Purpose } from "../../../../api/getPurpose";
import deleteAgreement from "../../../../api/deleteAgreement";
import { enqueueSnackbar } from "notistack";
import { Agreement } from "../../../../Models/Agreement";
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

export default function getColumns(refresh: () => void, purposes?: Purpose[]) {
  const columns: GridColDef<Agreement>[] = [
    { headerName: "ID", field: "id", width: 50, type: "number" },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
      type: "date",
      valueGetter: (params) => new Date(params.value),
    },
    {
      align: "center",
      headerName: "Дате последней проверки",
      headerAlign: "center",
      field: "last_check_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      headerName: "ФИО должника",
      headerAlign: "center",
      field: "FIO",
      sortable: false,
      width: 160,
      editable: false,
      type: "string",
    },
    {
      // * work
      align: "center",
      headerName: "Дата рождения",
      headerAlign: "center",
      field: "birth_date",
      width: 150,
      type: "date",
    },
    {
      // * work
      align: "center",
      headerName: "КД",
      headerAlign: "center",
      field: "KD",
      width: 100,
      type: "number",
    },
    {
      // * work
      align: "center",
      headerName: "ID дела",
      headerAlign: "center",
      field: "r_law_act_id",
      width: 150,
      type: "number",
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
      headerName: "Сумма задолженности, переданная банком",
      align: "center",
      headerAlign: "center",
      field: "debt_bank_sum",
      width: 150,
      type: "number",
    },
    {
      headerName: "Сумма задолженности по судебному акту в пользу банка",
      align: "center",
      headerAlign: "center",
      field: "court_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      headerName: "Сумма задолженности ОД взысканная в пользу НБК /Вымпел ",
      align: "center",
      headerAlign: "center",
      field: "debt_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма задолженности по пересчету",
      field: "recalculation_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дисконт",
      field: "discount_sum",
      width: 150,
      editable: true,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "law_act_debt",
      width: 150,
      editable: true,
      type: "number",
    },

    {
      headerName: "Дата мирового соглашения",
      align: "center",
      headerAlign: "center",
      description: "Дата платежа по соглашению",
      field: "settlement_date",
      width: 150,
      type: "number",
    },
    {
      //todo высчитывается
      align: "center",
      headerName: "Сумма мирового соглашения",
      headerAlign: "center",
      description: "Cумма первого платежа по соглашению",
      field: "settlement_sum",
      width: 150,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма последнего платежа",
      field: "last_pay_sum",
      width: 150,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма платежей после соглашения",
      field: "sum_after_conclusion",
      width: 150,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Наличие ИД",
      field: "reg_doc",
      width: 150,
      type: "boolean",
      editable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата получения листа",
      field: "receipt_dt",
      width: 150,
      type: "date",
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
      align: "center",
      headerAlign: "center",
      headerName: "ФИО поручителя",
      field: "debt_guarantor", // debt <- parent_id <- debt_guarantor
      width: 150,
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Имущество",
      field: "person_property",
      width: 150,
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
      headerName: "Удалить",
      align: "center",
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteAgreement(params.row.id).subscribe(() => {
              refresh();
              enqueueSnackbar("Удалено", { variant: "warning" });
            });
          }}
        />,
      ],
    },
  ];
  return columns;
}
