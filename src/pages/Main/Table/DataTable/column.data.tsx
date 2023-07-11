import { Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridPinnedColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid-premium";
import AddIcon from "@mui/icons-material/Add";
import { AgreementInstance } from "../../../../Reducer/Agreement/AgreementInstance";
import { dateColumnType } from "../../../../utils/DateCol";
import { Can } from "../../../../casl/casl";
import { Action, AppAbility, Subject } from "../../../../casl/casl.factory";
import { CustomEvents, EventDialog } from "../Table";
import IpIcon from "../CardIpDialog/IpIcon";
import { Portfolio, User } from "@contact/models";
import DeleteButton from "./DeleteIcon";
import { IdTitle } from "../../../../Models/IdTitle";
import ZalogIcon from "../Zalog/ZalogIcon";
import React from "react";
import _ from "lodash";
import getName from "../../../../Reducer/getName";
import { classes } from "../Style/style";
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
function ExpandableCell({ value }: GridRenderCellParams) {
  const [text, sized] = React.useMemo(
    () => [value?.slice(0, 200), value?.length > 200],
    [value]
  );
  return (
    <Tooltip
      title={<Typography sx={{ whiteSpace: "pre-line" }}>{value}</Typography>}
    >
      <Typography>
        {text?.slice(0, 200) || ""}
        {sized && "..."}
      </Typography>
    </Tooltip>
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
  collectors: User[],
  eventTarget: EventTarget,
  pinned: GridPinnedColumns
) {
  const selectPortfolio = portfolios.map((port) => ({
    label: port.name,
    value: port.id,
  }));
  const selectCollectors = collectors.map((item) => ({
    value: item.id,
    label: getName(item.f, item.i, item.o),
  }));
  const columns: GridColDef<AgreementInstance>[] = [
    {
      headerClassName: (params) => {
        return classes.red;
      },
      field: "id",
      headerName: "ID",
      width: 50,
      type: "number",
    },
    {
      filterable: false,
      field: "KD",
      headerName: "№ КД",
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.Person.Debts?.map((item) => item.contract)[0];
      },
    },
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
      align: "center",
      headerAlign: "center",
      headerName: "Сумма с дисконтом",
      field: "discount_sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Cтатичный дисконт (ред.)",
      field: "discount",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
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
      valueFormatter: (params) => {
        if (params.value === null) return "Единовременно";
        return params.value;
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
      headerName: "Сумма платежей до соглашения",
      align: "center",
      headerAlign: "center",
      description: "Сумма платежей до соглашения",
      field: "sumBeforeAgr",
      width: 150,
      type: "number",
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
        return _.uniq(
          row.DebtLinks?.map((item) => item.Debt?.Portfolio?.name)
        ).join("\n");
      },
      renderCell: ({ formattedValue }) => (
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {formattedValue}
        </Typography>
      ),
    },
    {
      align: "center",
      headerName: "Первый платеж по соглашению",
      headerAlign: "center",
      description: "Первый платеж по соглашению из контакта",
      field: "firstPayment",
      width: 150,
      type: "number",
      valueGetter: (params) => params.row.firstPayment || null,
    },
    {
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
      type: "string",
    },
    {
      headerName: "Наличие в архиве",
      field: "archive",
      width: 150,
      align: "center",
      editable: true,
      headerAlign: "center",
      type: "string",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Переданная банком сумма долга (эл.реестр)",
      field: "bank_sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      headerName: "В пользу в банка (сумма долга)",
      align: "center",
      headerAlign: "center",
      field: "court_sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      headerName: "В пользу НБК/Вымпел (сумма долга)",
      align: "center",
      headerAlign: "center",
      field: "debt_sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Пересчет / Индексация",
      field: "recalculation_sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      align: "center",
      headerAlign: "center",
      headerName: "Расчетный дисконт",
      field: "calculation_discount",
      width: 100,
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
      width: 300,
      type: "stirng",
      editable: ability.can(Action.Update, Subject.Agreement),
      renderCell: (params: GridRenderCellParams) => (
        <ExpandableCell {...params} />
      ),
      //TODO getActions
    },
    {
      headerAlign: "center",
      headerName: "Взыскатель",
      align: "center",
      field: "collector_id",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "singleSelect",

      valueOptions: (params) => {
        return 1 || params.row?.collector_id
          ? selectCollectors
          : [params.row?.collector || " "];
      },
      valueGetter(params) {
        return params.value || params.row.collector;
      },
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
      headerName: "Карточка ИП",
      field: "Card_IP",
      type: "actions",
      width: 125,
      getActions: (params) => [
        <ButtonGroup size="small" orientation="vertical" variant="text">
          <IpIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
            agreementId={params.row.id}
          />
          <ZalogIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
            person_id={params.row.person_id}
          />
        </ButtonGroup>,
      ],
    },
    {
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
