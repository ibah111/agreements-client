import { IsNumber, IsOptional } from "class-validator";
import {
  DateRange,
  IsNotEmpty,
  IsPositive,
  IsValidMoment,
} from "../../Hooks/Validation/locale";
import { AgreementData } from "./Agreement";
import { DateType } from "../Utils/DateType";
import { TransformDate } from "../Utils/TransformDate";
import moment from "moment";
import { Person } from "@contact/models";
import AgreementDebtsLink from "../../Models/AgreementDebtLink";

export class AgreementInstance implements AgreementData {
  @IsNumber()
  @IsNotEmpty()
  personId: number;
  /**
   * ID записи
   */
  id: number;

  /**
   * Дата заключения
   */
  @DateRange({
    minDate: moment("2001"),
    maxDate: moment().add(1, "m"),
  })
  @IsValidMoment()
  @IsNotEmpty()
  @DateType(false)
  @TransformDate(false)
  conclusion_date: moment.Moment;
  /**
   * Тип соглашения
   */
  @IsNotEmpty()
  agreement_type: number;
  /**
   * Назначение
   */
  @IsNotEmpty()
  purpose: number;
  /**
   * эл.реестр
   * сумма переданная банком
   */
  @IsPositive()
  bank_sum: number;
  /**
   * Cумма задолженности по суд.акту
   */
  @IsPositive()
  court_sum: number;
  /**
   * Сумма задолженности ОД взысканная в пользу НБК / Вымпел
   */
  @IsPositive()
  debt_sum: number;
  /**
   * Сумма задолженности по пересчету
   */
  @IsPositive()
  @IsOptional()
  recalculation_sum: number;
  /**
   * Статичный дисконт
   */
  @IsPositive()
  @IsOptional()
  discount: number;
  /**
   * Дисконт
   */
  @IsPositive()
  @IsOptional()
  discount_sum: number;
  /**
   * Число платежа каждого месяца
   */
  @IsPositive()
  month_pay_day: number;
  /**
   * тип соглашения
   */
  /**
   * Наличие ИД в регистраторе
   */
  @IsOptional()
  new_regDoc: number;
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
    minDate: moment("2001"),
    maxDate: moment().add(1, "m"),
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

  /**
   * Дата завершения
   */
  @DateRange({
    minDate: moment("2001"),
    maxDate: moment().add(1, "m"),
  })
  @IsValidMoment()
  @IsOptional()
  @DateType(false)
  @TransformDate(false)
  finish_date: moment.Moment;

  @IsNotEmpty()
  statusAgreement: number;

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
