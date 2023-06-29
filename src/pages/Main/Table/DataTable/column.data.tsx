import { Button, Tooltip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-premium";
import AddIcon from "@mui/icons-material/Add";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import { dateColumnType } from "../../../../utils/DateCol";
import { Can } from "../../../../casl/casl";
import { Action, AppAbility, Subject } from "../../../../casl/casl.factory";
import { CustomEvents, EventDialog } from "../Table";
import IpIcon from "../CardIpDialog/IpIcon";
import { Portfolio } from "@contact/models";
import DeleteButton from "./DeleteIcon";
import { IdTitle } from "../../../../Models/IdTitle";
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
export default function GetColumns(
  refresh: () => void,
  ability: AppAbility,
  agreementType: IdTitle[],
  purposes: IdTitle[],
  regDoc: IdTitle[],
  status: IdTitle[],
  portfolios: Portfolio[],
  eventTarget: EventTarget
) {
  const selectPortfolio = portfolios.map((port) => ({
    label: port.name,
    value: port.id,
  }));
  const styleHeader = "super-app-theme--header";
  const columns: GridColDef<AgreementInstance>[] = [
    { field: "id", headerName: "ID", width: 50, type: "number" },
    {
      field: "conclusion_date",
      ...dateColumnType,
      headerName: "Дата заключения",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "ID Должника",
      align: "center",
      headerAlign: "center",
      field: "personId",
      width: 75,
      editable: false,
      sortable: false,
      type: "number",
      valueGetter: (params) => params.row.Person?.id,
    },
    {
      headerName: "ФИО должника",
      align: "center",
      headerAlign: "center",
      field: "FIO",
      sortable: false,
      width: 150,
      editable: false,
      type: "string",
      valueGetter: (params) => params.row.Person?.fio || "",
    },
    {
      headerName: "Тип соглашения",
      headerAlign: "center",
      field: "agreement_type",
      width: 100,
      align: "center",
      editable: true,
      type: "singleSelect",
      valueOptions:
        agreementType?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
    },
    {
      width: 100,
      headerAlign: "center",
      headerName: "Платежный статус",
      align: "center",
      field: "payableStatus",
      type: "boolean",
      valueGetter: (params) => {
        const count = params.row.DebtLinks?.reduce(
          (prev, item) => prev + Number(item.Debt?.LastCalcs?.length),
          0
        );
        return count && count > 0;
      },
    },
    {
      headerName: "День платежа",
      align: "center",
      headerAlign: "center",
      description: "Дата платежа по соглашению",
      field: "month_pay_day",
      width: 75,
      type: "number",
      editable: ability.can(Action.Update, Subject.Agreement),
      valueGetter: (params) => {
        if (params.row.month_pay_day === 0) return "Единовременно";
        return params.row.month_pay_day;
      },
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
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      headerName: "Дата посл.платежа",
      field: "lastPaymentDate",
      type: "date",
      editable: false,
      width: 125,
      valueGetter: (params) => params.row.lastPaymentDate?.toDate() || null,
    },
    {
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      headerName: "Сум. плат. после соглашения",
      field: "sumAfterAgr",
      width: 150,
      type: "number",
      valueGetter: (params) => params.row.sumAfterAgr || null,
    },
    {
      field: "finish_date",
      ...dateColumnType,
      align: "center",
      headerAlign: "center",
      headerName: "Дата завершения",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "Назначение",
      align: "center",
      headerAlign: "center",
      field: "purpose",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
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
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "singleSelect",
      valueOptions:
        status?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Портфель",
      field: "portfolio",
      width: 150,
      type: "singleSelect",
      valueOptions: selectPortfolio,
      valueFormatter: (params) => {
        if (!params.id) return;
        const row = params.api.getRow(params.id) as AgreementInstance;
        return row.DebtLinks?.map((item) => item.Debt?.Portfolio?.name).join(
          " ,"
        );
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Начальный долг",
      field: "start_sum",
      width: 150,
      type: "number",
      valueGetter: (params) => {
        return params.row.Person?.Debts?.find(
          (item) => !/.*[ПЕРЕСЧЕТ|ИНДЕКСАЦИЯ].*/.test(item.name || "")
        )?.start_sum;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Переданная банком сумма долга (эл.реестр)",
      field: "bank_sum",
      width: 250,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      headerName: "В пользу в банка (сумма долга)",
      align: "center",
      headerAlign: "center",
      field: "court_sum",
      width: 250,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      // заполняется
      headerName: "В пользу НБК/Вымпел (сумма долга)",
      align: "center",
      headerAlign: "center",
      field: "debt_sum",
      width: 250,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      // заполняется
      align: "center",
      headerAlign: "center",
      headerName: "Пересчет / Индексация",
      field: "recalculation_sum",
      width: 250,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      // заполняется
      align: "center",
      headerAlign: "center",
      headerName: "Сумма с дисконтом ",
      field: "discount_sum",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      // вычисляемое
      align: "center",
      headerAlign: "center",
      headerName: "Расчетный дисконт",
      field: "calculation_discount",
      width: 300,
      editable: false,
      type: "number",
      valueGetter: (params) => {
        let result = 0;
        // просто пихнуть сумму по соглсу - дисконт
        if (params.row.discount_sum === 0) {
          result = 0;
        } else if (params.row.recalculation_sum)
          result += params.row.recalculation_sum;
        else if (params.row.court_sum) result += params.row.court_sum;
        if (result > 0 && params.row.discount_sum)
          result -= params.row.discount_sum;
        return result;
      },
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Cтатичный дисконт (ред.)",
      field: "discount",
      width: 200,
      editable: ability.can(Action.Update, Subject.Agreement),
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
      headerName: "Наличие ИД",
      field: "new_reg_doc",
      width: 150,
      type: "singleSelect",
      valueOptions:
        regDoc?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "№ в Регистраторе/Архиве",
      field: "registrator",
      width: 150,
      align: "center",
      headerAlign: "center",
      editable: true,
      type: "number",
    },
    {
      headerName: "Наличие в архиве",
      field: "archive",
      width: 150,
      align: "center",
      editable: true,
      headerAlign: "center",
      type: "number",
    },
    {
      field: "receipt_dt",
      ...dateColumnType,
      width: 150,
      align: "center",
      headerAlign: "center",
      headerName: "Дата получения листа",
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Действия для получения или предъявления листа",
      field: "actions_for_get",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
    },
    {
      headerAlign: "center",
      headerName: "Комментарий",
      field: "comment",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
    },
    {
      headerAlign: "center",
      headerName: "Взыскатель",
      field: "collector",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Ссылка на задачу",
      field: "task_link",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
      renderCell: ({ value }) => <RenderLink value={value} />,
    },
    {
      headerClassName: styleHeader,
      headerName: "ИП",
      field: "Card_IP",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <IpIcon
          eventTarget={eventTarget || null}
          refresh={refresh}
          agreementId={params.row.id}
        />,
      ],
    },
    {
      headerClassName: styleHeader,
      headerAlign: "center",
      headerName: "Действия",
      align: "center",
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <DeleteButton id={params.row.id} refresh={refresh} />
        </Can>,
        <Can I={Action.Create} a={Subject.AgreementToDebt}>
          <Tooltip title="Связать долг">
            <GridActionsCellItem
              icon={<AddIcon />}
              label="AddDebt"
              onClick={() => {
                eventTarget?.dispatchEvent(
                  new EventDialog(CustomEvents.onOpenDialog, params.row.id)
                );
              }}
            />
          </Tooltip>
        </Can>,
      ],
    },
  ];
  return columns.map((item) => ({ ...item, sortable: false }));
}
