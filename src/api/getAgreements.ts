import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid-premium";
import { Observable } from "rxjs";
import { Agreement } from "../Models/Agreement";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";
export interface Page {
  rows: Agreement[];
  count: number;
}
interface getAgreementInstanceParams {
  paginationModel: GridPaginationModel;
  filterModel: GridFilterModel;
}
export default function getAgreements(params: getAgreementInstanceParams) {
  return new Observable<Page>((sub) => {
    baseRequest
      .post<Page>("/Agreements/all", params)
      .then(createNextDefault(sub))
      .catch(createError(sub));
  }).pipe(createRetry());
}
