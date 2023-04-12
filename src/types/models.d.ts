import "@contact/models";
import { TypDate } from "@contact/models/dist/config";

declare module "@contact/models" {
  export interface CustomOptionsModels {
    date: TypDate.MOMENT;
  }
}
