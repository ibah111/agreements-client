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
export class Agreement extends Model<
  InferAttributes<Agreement>,
  InferCreationAttributes<Agreement>,
  CreateLiteralAssociation<Agreement>
> {
  /**
   * ID записи
   */
  declare id: CreationOptional<number>;
  /**
   * Имя
   */
  FIO: string;
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
  court_sum: number;
  /**
   * Сумма задолженности ОД взысканная в пользу НБК / Вымпел
   */
  debt_sum: number;
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
  month_pay_day: number;
  /**
   * Наличие ИД в регистраторе
   */
  reg_doc: CreationOptional<boolean>;
  /**
   * Комментарии
   */
  comment: string | null;
  /**
   * Ссылка на задачу
   */
  task_link: string;
  LawAct: any;
  Debt: any;
  LawExec: any;
}
