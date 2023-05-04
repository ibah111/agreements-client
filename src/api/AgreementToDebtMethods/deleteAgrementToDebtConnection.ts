import AgreementDebtsLink from "../../Models/AgreementDebtLink";
import { AgreementToDebtData } from "../../Reducer/AgreementToDebt/AgreementToDebt";
import { baseRequest } from "../../utils/baseRequest";
import processError from "../../utils/processError";

export default async function deleteAgreementToDebtConnection(
  data: AgreementToDebtData
) {
  try {
    const createLink = await baseRequest.delete<AgreementDebtsLink>(
      `/AgreementToDebtConnection`,
      { data }
    );
    return createLink;
  } catch (e) {
    processError(e);
    throw e;
  }
}
