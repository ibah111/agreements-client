import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
import {
  authRetry,
  post,
  transformAxios,
  transformFindAndCount,
} from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import { transformError } from "../utils/processError";
export interface Page {
  rows: AgreementInstance[];
  count: number;
}
interface getAgreementInstanceParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}
export default function getAgreements(params: getAgreementInstanceParams) {
  return of(params).pipe(
    post<Page>(baseRequest, "/Agreements/all"),
    transformAxios(),
    transformError(),
    authRetry(),
    transformFindAndCount(AgreementInstance)
  );
}
