import { User } from "@contact/models";
/**
 * ref: ActiongLog in SQLServer
 */
export class ActionLogModel {
  id: number;
  row_id: number;
  actionType: number;
  field: string;
  user: number;
  User: User;
  old_value: any;
  new_value: any;
  createdAt: Date;
  updatedAt: Date;
}
