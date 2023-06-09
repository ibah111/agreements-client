import { post, transformAxios } from "@tools/rxjs-pipes";
import axios from "axios";
import { catchError, mergeMap, of } from "rxjs";
import getToken from "../../api/getToken";
import { AuthUserSuccess } from "../../Schemas/Auth";
import { baseRequest } from "../../utils/baseRequest";

export default function connect() {
  return getToken().pipe(
    mergeMap((token) => {
      baseRequest.defaults.headers["token"] = token;
      return of("").pipe(
        post<AuthUserSuccess>(baseRequest, "/login"),
        transformAxios()
      );
    }),
    catchError((e) => {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (data.Result === "error") {
          throw data?.Message;
        }
      }
      // eslint-disable-next-line no-throw-literal
      throw null;
    })
  );
}
