import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid-premium";
import { Observable } from "rxjs";
import { AgreementInstance } from "../Reducer/Agreement/AgreementInstance";
import { baseRequest } from "../utils/baseRequest";
import {
  createError,
  createNextDefault,
  createRetry,
} from "../utils/processError";

export default function getAgreements(
  paginationModel: GridPaginationModel,
  filterModel: GridFilterModel
) {
  return new Observable<AgreementInstance[]>((sub) => {
    baseRequest
      .post<AgreementInstance[]>("/Agreements/all", {
        paginationModel,
        filterModel,
      })
      .then(createNextDefault(sub))
      .catch(createError(sub));
  }).pipe(createRetry());
}
