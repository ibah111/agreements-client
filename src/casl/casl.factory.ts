import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { AuthUserSuccess } from "../Schemas/Auth";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Permit = "permit",
  Delete = "delete",
}
export enum Subject {
  Agreement = "agreement",
  AgreementToDebt = "agreementToDebt",
}
export type Subjects = Subject | "all";
export type AppAbility = PureAbility<[Action, Subjects]>;

export function createUserAbility(user?: AuthUserSuccess) {
  console.log(user);
  const { build, can } = new AbilityBuilder<AppAbility>(createMongoAbility);
  const roles = user?.roles;
  can(Action.Read, Subject.Agreement);
  if (!user) return build();
  if (roles?.includes("moderator")) {
    can([Action.Create, Action.Update, Action.Delete], Subject.Agreement);
    can([Action.Create, Action.Read], Subject.AgreementToDebt);
  }
  if (roles?.includes("admin")) {
    can(Action.Manage, "all");
  }
  return build();
}
