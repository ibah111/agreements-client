import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import {
  authRetry,
  post,
  transformAxios,
  transformFindAndCount,
} from "@tools/rxjs-pipes";
import { transformError } from "../../utils/processError";
import { AgreementInstance } from "../../Reducer/Agreement/AgreementInstance";
import {
  GridPaginationModel,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";

export interface DeletedPage {
  /**
   * model instance
   */
  rows: AgreementInstance[];
  count: number;
}
interface getAgreementInstanceParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}
export default function getDeleted(params: getAgreementInstanceParams) {
  return of(params).pipe(
    post<DeletedPage>(baseRequest, "/AG/getDeleted"),
    transformAxios(),
    transformError(),
    authRetry(),
    transformFindAndCount(AgreementInstance)
  );
}
