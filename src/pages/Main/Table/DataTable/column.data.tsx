import { Button, Typography } from "@mui/material";
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
import { Portfolio, User } from "@contact/models";
import { IdTitle } from "../../../../Models/IdTitle";
import ZalogIcon from "../Zalog/ZalogIcon";
import React from "react";
import _ from "lodash";
import IpIcon from "../CardIpDialog/IpIcon";
import { getAlign, getPinnedStyle } from "./additional.settings";
import DeleteIcon from "./DeleteAgreement/DeleteIcon";
import CommentActionCellItem from "../CommentDialog/CommentActionItem";
import getName from "../../../../Reducer/getName";
import moment from "moment-timezone";
import SyncOneIcon from "./SyncOneIcon/SyncOneIcon";
import ScheduleIcon from "../ScheduleDialog/ScheduleIcon";
import getDateMoment from "../../../../utils/getDateMoment";
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
    <Typography>
      {text?.slice(0, 200) || ""}
      {sized && "..."}
    </Typography>
  );
}

export default function GetColumns(
  refresh: () => void,
  ability: AppAbility,
  agreementType: IdTitle[],
  regDocs: IdTitle[],
  status: IdTitle[],
  portfolios: Portfolio[],
  collectors: User[],
  eventTarget: EventTarget,
  pinned: GridPinnedColumns
) {
  const regDoc = [{ id: null, title: "Нет" }, ...regDocs];
  const selectPortfolio = portfolios.map((port) => ({
    label: port.name,
    value: port.id,
  }));
  collectors.map((item) => ({ label: item.f, value: item.id }));
  const n_collectors = [
    { label: "Нет", value: 0 },
    ...collectors.map((item) => ({ label: item.f, value: item.id })),
  ];
  const columns: GridColDef<AgreementInstance>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      type: "number",
      editable: false,
      sortable: false,
    },
    {
      field: "contract",
      type: "string",
      width: 150,
      headerName: "№ КД",
      editable: false,
      sortable: false,
      valueGetter: (params) => {
        return _.uniq(params.row.DebtLinks?.map((item) => item.contract)).join(
          ",\n"
        );
      },
      renderCell({ value }) {
        return <Typography sx={{ whiteSpace: "pre-line" }}>{value}</Typography>;
      },
    },
    {
      ...dateColumnType,
      field: "conclusion_date",
      headerName: "Дата заключения",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      field: "person_id",
      headerName: "ID должника",
      width: 100,
    },
    {
      headerName: "ФИО должника",
      field: "FIO",
      width: 150,
      editable: false,
      type: "string",
      valueGetter: (params) => {
        const param = params.row.PersonPreview;
        return getName(param.f, param.i, param.o);
      },
    },
    {
      ...dateColumnType,
      sortable: false,
      headerName: "ДР должника",
      field: "birth_date",
      width: 100,
      editable: false,
      type: "Date",
      valueGetter: (params) => {
        return moment(params.row.PersonPreview.birth_date).format("DD.MM.YYYY");
      },
    },
    {
      headerName: "Тип соглашения",
      field: "agreement_type",
      width: 100,
      type: "singleSelect",
      valueOptions:
        agreementType?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
      editable: ability.can(Action.Update, Subject.Agreement),
      sortable: false,
    },
    {
      headerName: "Полный размер требования",
      description:
        "Составное число из суммы к погашению с дисконтом + дисконта",
      field: "full_req",
      width: 100,
      type: "number",
      editable: ability.can(Action.Update, Subject.Agreement),
      valueGetter(params) {
        // const discount = params.row.discount;
        const full_req = params.row.full_req;
        // const sum = params.row.sum;
        if (full_req) return full_req;
        // if (discount && sum) return discount + sum;
        // if (sum) return sum;
      },
    },
    {
      headerName: "Дисконт",
      field: "discount",
      width: 100,
      type: "number",
      editable: ability.can(Action.Update, Subject.Agreement),
      valueGetter(params) {
        const discount = params.row.discount;
        const full_req = params.row.full_req;
        const sum = params.row.sum;
        if (discount) {
          return discount;
        } else if (full_req && sum) {
          return full_req - sum;
        } else if (discount === 0 || null) return 0;
        else return 0;
      },
    },
    {
      headerName: "Сумма с дисконтом",
      description: "Сумма задолженности к погашению по соглашению с дисконтом",
      field: "sum",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "number",
    },
    {
      headerName: "Плат.после соглашения",
      description: "Сумма платежей после соглашения",
      field: "sum_payments_after",
      width: 100,
      type: "number",
      valueGetter: (params) => {
        const value =
          params.row.DebtLinks?.map((item) => item.sum_payments) || [];
        return value?.reduce((prev, curr) => prev + curr, 0);
      },
    },
    {
      headerName: "Остаток задолженности",
      description: "Остаток задолженности по соглашению",
      field: "sum_remains",
      type: "number",
      width: 100,
    },
    {
      width: 50,
      headerName: "Платежный статус",
      field: "payable_status",
      type: "boolean",
      valueGetter: (params) => {
        const value = params.row.payable_status || null;
        return value;
      },
    },
    {
      headerName: "День платежа",
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
      ...dateColumnType,
      field: "one_day_date_payment",
      headerName: "Дата единовременного платежа",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Последний платеж",
      description: "Последний зарег. платеж из контакта",
      field: "last_payment",
      width: 150,
      type: "number",
      editable: false,
      valueGetter: (params) => {
        const value =
          params.row.DebtLinks?.map((item) => item.last_payment) || [];
        return value?.reduce((prev, curr) => prev + curr, 0);
      },
    },
    {
      ...dateColumnType,
      editable: false,
      headerName: "Дата посл.платежа",
      field: "last_payment_date",
      type: "Date",
      width: 125,
      valueGetter: (params) => {
        const arr = params.row.DebtLinks?.filter(
          (item) => item.last_payment_date != null
        )
          .map((item) => item.last_payment_date)
          .sort();

        if (!arr) return;
        const last = arr[arr?.length - 1] as unknown as Date;

        return getDateMoment(last);
      },
    },
    {
      ...dateColumnType,
      field: "finish_date",
      headerName: "Дата завершения",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "Статус",
      field: "statusAgreement",
      width: 50,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "singleSelect",
      valueOptions:
        status?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || [],
    },
    {
      sortable: false,
      headerName: "Портфель",
      field: "portfolio",
      width: 125,
      type: "singleSelect",
      valueOptions: selectPortfolio,
      valueFormatter: (params) => {
        if (!params.id) return;
        const cell = params.api.getRow(params.id) as AgreementInstance;
        const nums = cell.DebtLinks?.map((item) => item.portfolio);
        if (nums === undefined) return "Портфелей нет";
        else
          for (const num of nums) {
            const str_name = portfolios.filter((item) => item.id === num);
            return str_name.map((item) => item.name);
          }
      },
      renderCell: ({ formattedValue }) => (
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {formattedValue}
        </Typography>
      ),
    },
    {
      headerName: "Первый платеж по соглашению",
      description: "Первый платеж по соглашению первого связанного долга",
      field: "first_payment",
      width: 150,
      type: "number",
      valueGetter: (params) =>
        params.row.DebtLinks?.map((item) => item.first_payment)[0] || null,
    },
    {
      ...dateColumnType,
      headerName: "Дата первого платежа",
      description: "Дата первого платежа",
      field: "first_payment_date",
      width: 250,
      type: "Date",
      valueGetter: (params) => {
        const arr = params.row.DebtLinks?.filter(
          (item) => item.first_payment_date != null
        )
          .map((item) => item.first_payment_date)
          .sort();

        if (!arr) return;
        const first = arr[0] as unknown as Date;
        return getDateMoment(first);
      },
    },
    {
      field: "car",
      headerName: "Машина",
      width: 150,
      type: "string",
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "Наличие ИД",
      field: "reg_doc",
      width: 150,
      type: "singleSelect",
      valueOptions:
        regDoc?.map((item) => ({
          label: item?.title,
          value: item?.id,
        })) || [],
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "№ в Регистраторе/Архиве",
      field: "registrator",
      width: 150,
      editable: true,
      type: "string",
      valueFormatter(params) {
        if (params.value) {
          const txt = params.value as string;
          const newtxt = txt.split(", ").join("\n");
          return newtxt;
        }
      },
      renderCell({ formattedValue }) {
        return (
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {formattedValue}
          </Typography>
        );
      },
    },
    {
      headerName: "Наличие в архиве",
      field: "archive",
      width: 150,
      editable: true,
      type: "string",
      valueFormatter(params) {
        if (params.value) {
          const txt = params.value as string;
          const newtxt = txt.split(", ").join("\n");
          return newtxt;
        }
      },
      renderCell({ formattedValue }) {
        return (
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {formattedValue}
          </Typography>
        );
      },
    },
    {
      field: "receipt_dt",
      ...dateColumnType,
      width: 150,
      headerName: "Дата получения листа",
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "Действия для получения или предъявления листа",
      field: "actions_for_get",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
    },
    {
      headerName: "Комментарий",
      field: "comment",
      width: 300,
      type: "string",
      editable: false,
      valueGetter(params) {
        const arr = params.row.Comments;
        if (arr === undefined || arr.length === 0) return "Комментариев нет";
        else {
          const text =
            arr?.[arr.length - 1]?.comment?.slice(0, 29) + "..." || "";
          return text;
        }
      },
      renderCell: (params: GridRenderCellParams) => (
        <>
          <ExpandableCell {...params} />
          <CommentActionCellItem
            refresh={refresh}
            agreement_id={params.row.id}
            eventTarget={eventTarget || null}
          />
        </>
      ),
    },
    {
      headerName: "Взыскатель",
      field: "collector_id",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "singleSelect",
      valueOptions: () => {
        return n_collectors;
      },
      valueGetter(params) {
        return params.row.collector_id || "";
      },
    },
    {
      headerName: "Ссылка на задачу",
      field: "task_link",
      width: 150,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "string",
      renderCell: ({ value }) => <RenderLink value={value} />,
    },
    {
      headerName: "ИП/Залог/График",
      field: "Card_IP",
      type: "actions",
      width: 130,
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <IpIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
            agreementId={params.row.id}
          />
          <ZalogIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
            agreement_id={params.row.id}
            person_id={params.row.person_id}
          />
          <ScheduleIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
            id_agreement={params.row.id}
            person_id={params.row.person_id}
          />
        </Can>,
      ],
    },
    {
      headerName: "Действия",
      field: "actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <DeleteIcon
            eventTarget={eventTarget || null}
            agreementId={params.row.id}
          />
        </Can>,
        <Can I={Action.Create} a={Subject.AgreementToDebt}>
          <GridActionsCellItem
            icon={<AddIcon />}
            label="AddDebt"
            onClick={() => {
              eventTarget?.dispatchEvent(
                new EventDialog(CustomEvents.onOpenDialog, params.row.id)
              );
            }}
          />
        </Can>,
        <Can I={Action.Update} a={Subject.Agreement}>
          <SyncOneIcon id_agreement={params.row.id} refresh={refresh} />
        </Can>,
      ],
    },
    {
      field: "debt_count",
      headerName: "Кол-во долгов",
      width: 50,
      description: "Количество долгов",
      type: "number",
      editable: false,
      valueGetter(params) {
        const count = params.row.debt_count;
        return count;
      },
    },
  ];
  return columns.map<GridColDef<AgreementInstance>>((item) => ({
    ...item,
    headerClassName: getPinnedStyle(pinned),
    headerAlign: "center",
    align: getAlign(item.field),
  }));
}
