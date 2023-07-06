import axios from "axios";
import { map, mergeMap, of } from "rxjs";
import { ValidationError } from "class-validator";
import { TranslateMessage } from "../Hooks/Validation/checker";
import { store } from "../Reducer";
import { addMessage } from "../Reducer/Message";
import { t } from "i18next";
import { createError } from "@tools/rxjs-pipes";
import getToken from "../api/getToken";
import { baseRequest } from "./baseRequest";

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function isValidationErrors(e: unknown): e is ValidationError[] {
  if (e instanceof Array)
    if (e.length > 0) if (e[0] instanceof ValidationError) return true;
  return false;
}
interface ResultError {
  addon?: string;
  e: unknown;
}
export default function processError(e: unknown, name?: string) {
  return of(e).pipe(
    map<unknown, ResultError>((e) => {
      if (isValidationErrors(e)) {
        for (const error of e) {
          if (error.constraints) {
            const keys = objectKeys(error.constraints);
            let errorName = ``;
            let options: Record<string, string> = {};
            const errorMessage = error.constraints[keys[0]];
            if (errorMessage.startsWith("{")) {
              const JsonMessage = JSON.parse(errorMessage) as TranslateMessage;
              errorName = JsonMessage.name;
              options = JsonMessage.options;
            } else {
              errorName = errorMessage;
            }
            store.dispatch(
              addMessage({
                message: t(
                  `form${
                    name ? `.${name}.errors_popup` : ".errors"
                  }.${errorName}`,
                  {
                    property: error.property,
                    value: error.property,
                    ...options,
                  }
                ),
                options: { variant: "error" },
              })
            );
          }
        }
      }

      if (axios.isAxiosError(e)) {
        if (e.response) {
          if (e.response.status === 401) {
            return { e, addon: "retry" };
          }
          store.dispatch(
            addMessage({
              message: `${e.message}`,
              options: {
                variant: "error",
              },
            })
          );
        }
      }
      return { e };
    }),
    mergeMap((result) => {
      if (result.addon === "retry") {
        return getToken().pipe(
          map((token) => {
            if (token) {
              baseRequest.defaults.headers["token"] = token;
              return result.addon;
            }
          })
        );
      }
      return of(result.e);
    })
  );
}
export const transformError = createError(processError);
