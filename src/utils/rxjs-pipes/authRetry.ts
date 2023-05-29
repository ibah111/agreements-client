import { Observable, retry } from "rxjs";

export function authRetry<T>() {
  return retry<T>({
    delay: (error) =>
      new Observable((subscriber) => {
        if (error === "retry") subscriber.next();
        subscriber.complete();
      }),
  });
}
