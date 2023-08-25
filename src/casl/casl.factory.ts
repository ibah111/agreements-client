import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";
import { AuthUserSuccess } from "../Schemas/Auth";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Permit = "permit",
  Delete = "delete",
  Restore = "restore",
}
export enum Subject {
  Debt = "Debt",
  Preview = "Preview",
  Comments = "Comments",
  Agreement = "agreement",
  AgreementToDebt = "agreementToDebt",
  DebtCalc = "DebtCalc",
  Admin = "Admin",
}
export type Subjects = Subject | "all";
export type AppAbility = PureAbility<[Action, Subjects]>;

export function createUserAbility(user?: AuthUserSuccess) {
  const { build, can } = new AbilityBuilder<AppAbility>(createMongoAbility);
  const roles = user?.roles;
  can(Action.Read, Subject.Agreement);
  if (!user) return build();
  if (roles?.includes("moderator")) {
    can([Action.Create, Action.Update, Action.Delete], Subject.Agreement);
    can([Action.Create, Action.Read, Action.Delete], Subject.AgreementToDebt);
    can(Action.Read, Subject.DebtCalc);
    can([Action.Read, Action.Restore], Subject.Admin);
    can([Action.Create], Subject.Comments);
  }
  if (roles?.includes("admin")) {
    can(Action.Manage, "all");
  }
  return build();
}
