import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable } from "rxjs";

export function get<V>(
  request: AxiosInstance,
  config?: AxiosRequestConfig<unknown>
) {
  return (data: Observable<string>) =>
    new Observable<AxiosResponse<V>>((sub) => {
      const controller = new AbortController();
      data.subscribe({
        next: (res) => {
          request
            .get(res, {
              ...config,
              signal: controller.signal,
            })
            .then((res) => {
              sub.next(res);
              sub.complete();
            })
            .catch((e) => {
              sub.error(e);
            });
        },
        error: (err) => {
          sub.error(err);
        },
      });
      return () => {
        controller.abort();
      };
    });
}
