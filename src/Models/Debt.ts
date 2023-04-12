import { Person } from "@contact/models";
import type { GetDate } from "@contact/models";
import { Type } from "class-transformer";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import { PersonInstance } from "./Person";

export default class DebtInstance {
  @DateType()
  @TransformDate()
  debt_dt: GetDate;
  @Type(() => PersonInstance)
  Person?: Person;
}
