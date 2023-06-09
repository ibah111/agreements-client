import { get, post, transformAxios } from "@tools/rxjs-pipes";
import axios from "axios";
import { map, mergeMap, of } from "rxjs";
import config from "../config/server.json";
const requests = axios.create({
  baseURL: config.oauth,
  withCredentials: true,
});
export function checkToken(token: string) {
  return of({ token }).pipe(
    post<boolean>(requests, "oauth/check"),
    transformAxios()
  );
}
export function authorize() {
  return of("oauth/authorize").pipe(
    get<string | false>(requests),
    transformAxios()
  );
}
export function redirect() {
  window.location.replace(
    config.oauth + `/oauth/authorize?origin=${window.location.href}`
  );
}
export function getLogin() {
  return authorize().pipe(
    map((result) => {
      if (result) return result;
      redirect();
      throw Error("Переадресация не прошла");
    })
  );
}
export default function getToken() {
  return getLogin().pipe(
    mergeMap((token) => {
      return checkToken(token).pipe(
        map((result) => {
          if (!result) redirect();
          return token;
        })
      );
    })
  );
}
