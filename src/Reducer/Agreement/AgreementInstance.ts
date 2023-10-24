import { IsOptional, IsString, Max, ValidateIf } from "class-validator";
import {
  DateRange,
  IsNotEmpty,
  IsPositive,
  IsValidMoment,
  IsNumber,
  IsBoolean,
} from "../../Hooks/Validation/locale";
import { AgreementData } from "./Agreement";
import { DateType } from "../Utils/DateType";
import { TransformDate } from "../Utils/TransformDate";
import moment from "moment";
import AgreementDebtsLink from "../../Models/AgreementDebtLink";
import { LawExecInstance } from "../../Models/LawExec";
import { Comments } from "../../Models/Comments";
import { Condition } from "../../Hooks/Validation/Condition";
import { PersonPreview } from "../../Models/PersonPreview";
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
  @DateRange({
    minDate: moment("2000"),
    maxDate: moment().add(3, "M"),
  })
  @DateType(false)
  @TransformDate(false)
  @IsValidMoment()
  @ValidateIf((o) => [2, 3].includes(o.statusAgreement))
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
   * Полный размер требования
   */
  @ValidateIf((o) => [1, 3, 4, 6, 7].includes(o.agreement_type))
  @IsPositive()
  @IsNumber()
  full_req: number | null;
  /**
   * дисконт
   */
  @IsOptional()
  discount: number | null;
  /**
   * Дисконт
   */
  @IsPositive()
  @Condition((value, obj) => (obj.full_req || 0) >= (value || 0))
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
  reg_doc: number;
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
  @IsBoolean()
  payable_status: boolean | null = false;

  @IsOptional()
  collector: string;

  @IsOptional()
  collector_id: number;

  @IsOptional()
  @IsString()
  comment: string;

  LawExecs: LawExecInstance;

  PersonPreview: PersonPreview;
  DebtLinks?: AgreementDebtsLink[];
  Comments?: Comments[];

  @IsOptional()
  debt_count: number;

  @ValidateIf((o) => [2].includes(o.agreement_type))
  @IsNotEmpty()
  car: string | null;

  @ValidateIf((o) => o.month_pay_day === null)
  @DateRange({
    minDate: moment(),
  })
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  @IsNotEmpty()
  one_day_payment_date: moment.Moment | null;
}
