import { Portfolio } from "@contact/models";
import { authRetry, get, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";

export default function getPortfolio() {
  return of("/Agreements/portfolio").pipe(
    get<Portfolio[]>(baseRequest),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
