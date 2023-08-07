import { IsValidMoment } from "../Hooks/Validation/locale";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";

export class PersonPreview {
  @IsValidMoment()
  @DateType(false)
  @TransformDate(false)
  birth_date: moment.Moment;
  f: string | null;
  i: string | null;
  o: string | null;
  person_id: number;
}
