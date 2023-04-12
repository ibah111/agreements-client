import type { GetDate } from "@contact/models";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";

export class PersonInstance {
  @DateType()
  @TransformDate()
  birth_date: GetDate;
}
