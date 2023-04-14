import { Person } from "@contact/models";
import type { GetDate } from "@contact/models";
import { Type } from "class-transformer";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import { PersonInstance } from "./Person";
import { CreationOptional } from "@sql-tools/sequelize";
import { IsNumber } from "class-validator";

export default class DebtInstance {
  declare id: CreationOptional<number>;
  personId: number; // GET /Debt/Parent_id/{id}
  @DateType()
  @TransformDate()
  debt_dt: GetDate;
  @Type(() => PersonInstance)
  Person?: Person;
  @IsNumber()
  debt_id: number; // GET /Debt/{id} // also // GET /Debt/Payments/{id}
}
