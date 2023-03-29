// import { Debt } from "@contact/models";
import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import DeleteIcon from "@mui/icons-material/Delete";
import { Purpose } from "../../../../api/getPurpose";
import { Agreement } from "../../../../Reducer/Agreement";
import deleteAgreement from "../../../../api/deleteAgreement";
import { enqueueSnackbar } from "notistack";
// import { Debt } from "@contact/models";
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
      headerName: "Дате последней проверки",
      headerAlign: "center",
      field: "last_check_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Дата заключения",
      field: "conclusion_date",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      headerName: "ФИО должника",
      headerAlign: "center",
      field: "name",
      sortable: false,
      width: 160,
      editable: false,
      type: "string",
      valueGetter: (params) => {
        return params.row.LawAct.Person?.fio;
      },
    },
    {
      align: "center",
      headerName: "Дата рождения",
      headerAlign: "center",
      field: "birth_date",
      width: 150,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row.LawAct.Person?.birth_date!);
      },
    },
    {
      align: "center",
      headerName: "КД",
      headerAlign: "center",
      field: "KD",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.contract;
      },
    },
    {
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
      // valueGetter: (value) => {
      //   const law_act = value.row.LawAct;
      //   const debts: Debt[] = value.row.LawAct?.Debt?.Person?.Debts || [];
      //   const data = debts.find(
      //     (item) => item.contract === law_act.contract && item.name === "_"
      //   );
      //   return data?.start_sum;
      // },
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.start_sum;
      },
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
      headerName: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "law_act_debt",
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
      headerName: "Дата мирового соглашения",
      align: "center",
      headerAlign: "center",
      description: "Дата платежа по соглашению",
      field: "settlement_date",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.settlement_date || undefined;
      },
    },
    {
      align: "center",
      headerName: "Сумма мирового соглашения",
      headerAlign: "center",
      description: "Cумма первого платежа по соглашению",
      field: "settlement_sum",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.settlement_sum || 0;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма аннуитетного платежа",
      field: "sum_every_month",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.annuity_pay || 0;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма последнего платежа",
      field: "last_pay_sum",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.last_pay_sum || 0;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Сумма платежей после соглашения",
      field: "sum_after_conclusion",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.basic_sum || 0;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Остаток основного долга",
      field: "debt_sum",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.debt_sum;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Наличие ИД в исполнении",
      field: "reg_doc_action",
      width: 150,
      type: "boolean",
      editable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Наличие ИД в регистраторе",
      field: "reg_doc",
      width: 150,
      type: "boolean",
      editable: true,
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Наличие ИД в архиве",
      field: "finish_doc",
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
      valueGetter: (params) =>
        params.row.LawAct.receipt_dt
          ? new Date(params.row.LawAct.receipt_dt)
          : undefined,
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
      headerName: "Количество кредитов в реестрах",
      field: "credit_mount",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.contract || 0;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "ФИО поручителя",
      field: "count_debt_guarantor",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.DebtGuarantors || "No guarantors";
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Имущество",
      field: "person_property",
      width: 150,
      type: "string",
      valueGetter: (params) => {
        const law_act = params.row.LawAct;
        const person_property = law_act.Debt?.PersonProperties?.[0] || null;
        if (person_property) {
          const params = person_property.PersonPropertyParams!;
          const vin = params.find(
            (item) => item.r_property_typ_params_id === 6
          )?.value;
          const name = params.find(
            (item) => item.r_property_typ_params_id === 7
          )?.value;
          return `${name} - ${vin}`;
        }
        return undefined;
      },
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
      headerName: "Статус долга",
      field: "debt_status",
      width: 150,
      type: "singleSelect",
      valueGetter: (params) => {
        return params.row.LawAct.Debt?.status;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "ФИО Взыскателя",
      field: "user",
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
            deleteAgreement(params.row.id).then(() => {
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
