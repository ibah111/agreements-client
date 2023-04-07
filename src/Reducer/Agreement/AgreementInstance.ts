import { IsString } from "class-validator";
import { IsNotEmpty } from "../../Hooks/Validation/locale";
import { AgreementData } from "./Agreement";

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
    /** Дата заключения
     */
    conclusion_date: moment.Moment;
    /**
     * Назначение
     */
    purpose: number;
    /**
     * Cумма задолженности по суд.акту
     */
    court_sum: number;
    /**
     * Сумма задолженности ОД взысканная в пользу НБК / Вымпел
     */
    debt_sum: number;
    /**
     * Сумма задолженности по пересчету
     */
    recalculation_sum: number;
    /**
     * Дисконт
     */
    discount_sum: number;
    /**
     * Число платежа каждого месяца
     */
    month_pay_day: number;
    /**
     * Наличие ИД в регистраторе
     */
    reg_doc: boolean;
    /**
     * Комментарии
     */
    comment: string;
    /**
     * Ссылка на задачу
     */
    task_link: string;
  }
  return AgreementInstance;
}
