import AgreementDebtsLink from "../Models/AgreementDebtLink";
import { AgreementToDebtData } from "../Reducer/AgreementToDebt/AgreementToDebt";
import { baseRequest } from "../utils/baseRequest";
import processError from "../utils/processError";

export default async function AgreementToDebtLink(data: AgreementToDebtData) {
  try {
    const createLink = await baseRequest.post<AgreementDebtsLink>(
      `/AgreementToDebtConnection`,
      { ...data }
    );
    return createLink;
  } catch (e) {
    processError(e);
    throw e;
  }
}
