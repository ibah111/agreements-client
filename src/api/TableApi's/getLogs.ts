import { authRetry, post, transformAxios } from "@tools/rxjs-pipes";
import { of } from "rxjs";
import { baseRequest } from "../../utils/baseRequest";
import { transformError } from "../../utils/processError";
import { ActionLogModel } from "../../Models/RouterGridModels/ActionLog";
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid-premium";
export interface LogsPage {
  /**
   * model instance
   */
  rows: ActionLogModel[];
  count: number;
}
interface getAgreementInstanceParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
}
export default function getLogs(params: getAgreementInstanceParams) {
  return of(params).pipe(
    post<LogsPage>(baseRequest, "/AG/getLogs"),
    transformAxios(),
    transformError(),
    authRetry()
  );
}
