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

export default function createAgreementInstance(date?: boolean) {
  class AgreementInstance implements AgreementData {
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
      minDate: moment().day(0).month(0).year(2001),
      maxDate: moment().day(0).month(0).year(2023),
    })
    @IsValidMoment()
    @IsNotEmpty()
    @DateType(date)
    @TransformDate(date)
    conclusion_date: moment.Moment;
    /**
     * Назначение
     */
    @IsNotEmpty()
    purpose: number;
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
    recalculation_sum: number;
    /**
     * Дисконт
     */
    @IsPositive()
    discount_sum: number;
    /**
     * Число платежа каждого месяца
     */
    @IsPositive()
    month_pay_day: number;
    /**
     * Наличие ИД в регистраторе
     */
    @IsOptional()
    reg_doc: boolean;
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
      minDate: moment().day(0).month(0).year(2001),
      maxDate: moment().day(0).month(0).year(2023),
    })
    @IsValidMoment()
    @IsOptional()
    @DateType(date)
    @TransformDate(date)
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
      minDate: moment().day(0).month(0).year(2001),
      maxDate: moment().day(0).month(0).year(2023),
    })
    @IsValidMoment()
    @IsOptional()
    @DateType(date)
    @TransformDate(date)
    finish_date: moment.Moment;
  }
  return AgreementInstance;
}
