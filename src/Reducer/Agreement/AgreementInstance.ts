import { IsOptional, IsString } from "class-validator";
import {
  IsNotEmpty,
  IsPositive,
  IsValidMoment,
} from "../../Hooks/Validation/locale";
import { AgreementData } from "./Agreement";
import { DateType } from "../Utils/DateType";
import { TransformDate } from "../Utils/TransformDate";
import { DateRange } from "../../Hooks/Validation/DateRange";
import moment from "moment";

export default function createAgreementInstance(date?: boolean) {
  class AgreementInstance implements AgreementData {
    /**
     * ID записи
     */
    id: number;
    /**
     * Имя
     */
    @IsString()
    @IsNotEmpty()
    FIO: string;

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
  }
  return AgreementInstance;
}
