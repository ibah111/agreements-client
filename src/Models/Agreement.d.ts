import type {
  BelongsToAttribute,
  CreateLiteralAssociation,
} from "@sql-tools/association-literal";
import type {
  CreationOptional,
  ForeignKey as FK,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "@sql-tools/sequelize";
import { Model } from "@sql-tools/sequelize-typescript";
import { PurposeType } from "./PurposeType";
import { Debt, LawAct, LawExec, Person } from "@contact/models";
export class Agreement extends Model<
  InferAttributes<Agreement>,
  InferCreationAttributes<Agreement>,
  CreateLiteralAssociation<Agreement>
> {
  /**
   * ID записи
   */
  declare id: CreationOptional<number>;
  person_id: number;
  /** Дата заключения
   */
  conclusion_date: moment.Moment;
  /**
   * Назначение
   */
  purpose: FK<number>;
  PurposeType?: BelongsToAttribute<NonAttribute<PurposeType>>;
  /**
   * Cумма задолженности по суд.акту
   */
  court_sum: number | null;
  /**
   * Сумма задолженности ОД взысканная в пользу НБК / Вымпел
   */
  debt_sum: number | null;
  /**
   * Сумма задолженности по пересчету
   */
  recalculation_sum: number | null;
  /**
   * Дисконт
   */
  discount_sum: number | null;
  /**
   * Число платежа каждого месяца
   */
  month_pay_day: number | null;
  /**
   * Наличие ИД в регистраторе
   */
  reg_doc: number | null;
  /**
   * номер регистратора (если ИД = наличие в регистраторе)
   */
  registrator: string | null;
  /**
   * Комментарии
   */
  comment: string | null;
  /**
   * Ссылка на задачу
   */
  task_link: string | null;
  /**
   * Дата получения листа
   */
  receipt_dt: moment.Moment | null;
  /**
   * Действия для получения листа
   */
  actions_for_get: string | null;
  /**
   * Дата завершения
   */
  finish_date: moment.Moment | null;

  statusAgreement: number;
  LawAct?: NonAttribute<LawAct>;
  Debt?: NonAttribute<Debt>;
  LawExec?: NonAttribute<LawExec>;
  Person?: NonAttribute<Person>;
}
