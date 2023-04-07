import type {
  CreateLiteralAssociation,
  HasManyAttribute,
} from "@sql-tools/association-literal";
import type {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "@sql-tools/sequelize";
import { Model } from "@sql-tools/sequelize-typescript";
import { Agreement } from "./Agreement";

export class PurposeType extends Model<
  InferAttributes<PurposeType>,
  InferCreationAttributes<PurposeType>,
  CreateLiteralAssociation<PurposeType>
> {
  declare id: number;
  title: string;
  Agreements?: HasManyAttribute<NonAttribute<Agreement[]>, "purpose">;
}
