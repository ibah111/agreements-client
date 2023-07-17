import { IsOptional, Max } from "class-validator";
import {
  DateRange,
  IsNotEmpty,
  IsPositive,
  IsValidMoment,
  IsNumber,
} from "../../Hooks/Validation/locale";
import { AgreementData } from "./Agreement";
import { DateType } from "../Utils/DateType";
import { TransformDate } from "../Utils/TransformDate";
import moment from "moment";
import { Person } from "@contact/models";
import AgreementDebtsLink from "../../Models/AgreementDebtLink";
import { LawExecInstance } from "../../Models/LawExec";

export class AgreementInstance implements AgreementData {
  @IsNumber()
  @IsNotEmpty()
  person_id: number;
  /**
   * ID записи
   */
  id: number;
  /**
   * Дата заключения
   */
  @DateRange({
    minDate: moment("2000"),
    maxDate: moment().add(1, "d"),
  })
  @IsValidMoment()
  @IsNotEmpty()
  @DateType(false)
  @TransformDate(false)
  conclusion_date: moment.Moment;
  /**
   * дата завершения заключения
   */
  @IsOptional()
  @DateRange({
    minDate: moment("2000"),
    maxDate: moment().add(1, "M"),
  })
  @DateType(false)
  @TransformDate(false)
  finish_date: moment.Moment | null;
  /**
   * Тип соглашения
   */
  @IsNotEmpty()
  agreement_type: number;
  /**
   * Назначение
   */
  @IsOptional()
  purpose: number;
  /**
   * Статичный дисконт
   */
  @IsOptional()
  discount: number | null;
  /**
   * Дисконт
   */
  @IsPositive()
  @IsOptional()
  sum: number | null;
  /**
   * Число платежа каждого месяца
   */
  @Max(30)
  @IsOptional()
  @IsNumber()
  month_pay_day: number | null;
  /**
   * Наличие ИД в регистраторе
   */
  @IsOptional()
  new_reg_doc: number;
  /**
   * Регистратор
   */
  @IsOptional()
  registrator: string;
  /**
   * архив
   */
  @IsOptional()
  archive: string;
  /**
   * Комментарии
   */
  @IsOptional()
  comment: string;
  /**
   * Ссылка на задачу
   */
  @IsOptional()
  task_link: string;
  /**
   * Дата листа
   */
  @DateRange({
    minDate: moment("2000"),
    maxDate: moment().add(1, "M"),
  })
  @IsValidMoment()
  @IsOptional()
  @DateType(false)
  @TransformDate(false)
  receipt_dt: moment.Moment;
  /**
   * Действия для листа
   */
  @IsOptional()
  actions_for_get: string;
  /** статус соглашения */
  @IsNotEmpty()
  statusAgreement: number;

  @IsOptional()
  collector: string;

  @IsOptional()
  collector_id: number;

  LawExecs: LawExecInstance;
  Person: Person;
  DebtLinks?: AgreementDebtsLink[];

  firstPayment: number | null;
  lastPayment: number | null;
  @IsValidMoment()
  @IsOptional()
  @DateType(false)
  @TransformDate(false)
  lastPaymentDate?: moment.Moment;
  @IsValidMoment()
  @IsOptional()
  @DateType(false)
  @TransformDate(false)
  firstPaymentDate?: moment.Moment;
  sumAfterAgr: number | null;
  sumBeforeAgr: number | null;
}
