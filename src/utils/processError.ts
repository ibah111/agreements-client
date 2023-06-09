import axios, { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { map, mergeMap, Observable, of, retry, Subscriber } from "rxjs";
import { ValidationError } from "class-validator";
import { TranslateMessage } from "../Hooks/Validation/checker";
import { store } from "../Reducer";
import { addMessage } from "../Reducer/Message";
import { t } from "i18next";
import { createError as createErrorRx } from "@tools/rxjs-pipes";
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
          enqueueSnackbar(`${e.message}`, {
            variant: "error",
          });
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
export const transformError = createErrorRx(processError);
export function createError<T>(subscriber: Subscriber<T>, name?: string) {
  return (e: unknown) =>
    processError(e, name).subscribe((e) => subscriber.error(e));
}
export function createNextDefault<T>(subscriber: Subscriber<T>) {
  return (res: AxiosResponse<T>) => {
    subscriber.next(res.data);
    subscriber.complete();
  };
}
export function createNextPlain<T>(subscriber: Subscriber<T>) {
  return (res: T) => {
    subscriber.next(res);
    subscriber.complete();
  };
}
export function createRetry<T>() {
  return retry<T>({
    delay: (err) =>
      new Observable((subscriber) => {
        if (err === "retry") subscriber.next();
        subscriber.complete();
      }),
  });
}
