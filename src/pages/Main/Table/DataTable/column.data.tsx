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
import { round } from "../../../../utils/round";
import getName from "../../../../Reducer/getName";
import moment from "moment-timezone";
import SyncOneIcon from "./SyncOneIcon/SyncOneIcon";
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

export default function useGetColumns(
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

  const columns: GridColDef<AgreementInstance>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      type: "number",
      editable: false,
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
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
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
      headerName: "ДР должника",
      field: "birth_date",
      width: 100,
      editable: true,
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
        const discount = params.row.discount;
        const full_req = params.row.full_req;
        const sum = params.row.sum;
        if (full_req) return full_req;
        if (discount && sum) return discount + sum;
        if (sum) return sum;
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
        } else if (discount === null) return 0;
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
      valueGetter(params) {
        const discount = params.row.discount;
        const full_req = params.row.full_req;
        const sum = params.row.sum;
        if (sum) return sum;
        if (full_req && discount) return full_req - discount;
        if (full_req) return full_req;
        else return 0;
      },
    },
    {
      disableColumnMenu: true,
      headerName: "Плат.после соглашения",
      description: "Сумма платежей после соглашения",
      field: "sumAfterAgr",
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
      valueGetter(params) {
        const sumAfterAgr = params.row.sumAfterAgr || 0;
        const sum = params.row.sum || 0;
        const full_req = params.row.full_req || 0;
        if (sum) return round(sum - sumAfterAgr);
        else if (full_req) return round(full_req - sumAfterAgr);
      },
    },
    {
      width: 100,
      headerName: "Платежный статус",
      field: "payableStatus",
      type: "boolean",
      valueGetter: (params) => {
        params.row.DebtLinks?.map((item) => item.payable_status);
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
      headerName: "Последний платеж",
      description: "Последний зарег. платеж из контакта",
      field: "lastPayment",
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
      disableColumnMenu: true,
      headerName: "Дата посл.платежа",
      field: "lastPaymentDate",
      type: "date",
      editable: false,
      width: 125,
      valueGetter: (params) => params.row.lastPaymentDate?.toDate() || null,
    },
    {
      headerName: "Сумма платежей до соглашения",
      description: "Сумма платежей до соглашения",
      field: "sumBeforeAgr",
      width: 150,
      type: "number",
    },
    {
      field: "finish_date",
      ...dateColumnType,
      headerName: "Дата завершения",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
    },
    {
      headerName: "Статус",
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
      headerName: "Портфель",
      field: "portfolio",
      width: 150,
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
      field: "firstPayment",
      width: 150,
      type: "number",
      valueGetter: (params) =>
        params.row.DebtLinks?.map((item) => item.first_payment)[0] || null,
    },
    {
      headerName: "Дата первого платежа",
      description: "Дата первого платежа",
      field: "firstPaymentDate",
      width: 250,
      type: "Date",
      valueGetter: (params) => {
        params.row.DebtLinks?.map((item) => item.first_payment_date);
      },
    },
    {
      headerName: "Наличие ИД",
      field: "new_reg_doc",
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
    },
    {
      headerName: "Наличие в архиве",
      field: "archive",
      width: 150,
      editable: true,
      type: "string",
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
        return (
          params.row.Comments?.[params.row.Comments.length - 1]?.comment || ""
        );
      },
      renderCell: (params: GridRenderCellParams) => (
        <ExpandableCell {...params} />
      ),
    },
    {
      headerName: "Доб.комментарий",
      field: "add_comment",
      width: 100,
      type: "actions",
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <CommentActionCellItem
            refresh={refresh}
            agreement_id={params.row.id}
            eventTarget={eventTarget || null}
          />
        </Can>,
      ],
    },
    {
      headerName: "Взыскатель",
      field: "collector_id",
      width: 100,
      editable: ability.can(Action.Update, Subject.Agreement),
      type: "singleSelect",
      valueOptions: () => {
        return collectors.map((item) => ({ label: item.f, value: item.id }));
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
      headerName: "ИП/Залог",
      field: "Card_IP",
      type: "actions",
      width: 90,
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
        </Can>,
      ],
    },
    {
      headerName: "Действия",
      field: "actions",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <Can I={Action.Delete} a={Subject.Agreement}>
          <DeleteIcon
            eventTarget={eventTarget || null}
            refresh={refresh}
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
        <Can I={Action.Create} a={Subject.AgreementToDebt}>
          <SyncOneIcon
            id_agreement={params.row.id}
            refresh={refresh}
            eventTarget={eventTarget || null}
          />
        </Can>,
      ],
    },
  ];
  return columns.map<GridColDef<AgreementInstance>>((item) => ({
    ...item,
    headerClassName: getPinnedStyle(pinned),
    headerAlign: "center",
    align: getAlign(item.field),
  }));
}
