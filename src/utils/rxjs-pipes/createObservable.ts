import { Observable } from "rxjs";

export function createObservable<V = undefined>(data?: V) {
  return new Observable<V>((sub) => {
    sub.next(data);
    sub.complete();
  });
}
