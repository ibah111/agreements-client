import type { GetDate, Person } from "@contact/models";
import { DateType } from "../Reducer/Utils/DateType";
import { TransformDate } from "../Reducer/Utils/TransformDate";
import { CreationAttributes } from "@sql-tools/sequelize";
import { Moment } from "moment";

export class PersonInstance implements CreationAttributes<Person> {
  f: string;
  fio: string;
  typ: 1 | 2 | 3;
  id?: number | undefined;
  i?: string | null | undefined;
  o?: string | null | undefined;
  importance?: number | null | undefined;
  decency?: number | null | undefined;
  r_passport_id?: number | null | undefined;
  company_name?: string | null | undefined;
  position?: string | null | undefined;
  dsc?: string | null | undefined;
  depart?: string | null | undefined;
  family_status?: number | null | undefined;
  sex?: string | null | undefined;
  education?: number | null | undefined;
  email?: string | null | undefined;
  id$?: number | null | undefined;
  inn?: string | null | undefined;
  kpp?: string | null | undefined;
  okved?: string | null | undefined;
  okpo?: string | null | undefined;
  r_account?: string | null | undefined;
  b_name?: string | null | undefined;
  k_account?: string | null | undefined;
  bik?: string | null | undefined;
  director_fio?: string | null | undefined;
  ogrn?: string | null | undefined;
  load_dt?: Moment | undefined;
  website?: string | null | undefined;
  analyst_dsc?: string | null | undefined;
  income?: number | null | undefined;
  flag_workplace_validated?: number | null | undefined;
  birth_place?: string | null | undefined;
  ext_id$?: string | null | undefined;
  ARCHIVE_DT?: Moment | null | undefined;
  DOCFLOW_DSC?: string | null | undefined;
  @DateType()
  @TransformDate()
  birth_date: GetDate;
}
