import { CreateLiteralAssociation } from "@sql-tools/association-literal";
import { InferAttributes, InferCreationAttributes } from "@sql-tools/sequelize";
import {
  PrimaryKey,
  Model,
  AllowNull,
  Column,
  DataType,
  ForeignKey,
} from "@sql-tools/sequelize-typescript";
import { Agreement } from "./Agreement";

export default class AgreementDebtsLink extends Model<
  InferAttributes<AgreementDebtsLink>,
  InferCreationAttributes<AgreementDebtsLink>,
  CreateLiteralAssociation<AgreementDebtsLink>
> {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id_debt: number;
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  @ForeignKey(() => Agreement)
  id_agreement: number;
}
