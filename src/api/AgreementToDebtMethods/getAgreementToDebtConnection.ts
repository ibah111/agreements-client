import AgreementDebtsLink from "../../Models/AgreementDebtLink";
import { baseRequest } from "../../utils/baseRequest";
import processError from "../../utils/processError";

export default async function getAgreementToDebtConnection(id: number) {
  try {
    const createLink = await baseRequest.delete<AgreementDebtsLink>(
      `/AgreementToDebtConnection/${id}`
    );
    return createLink;
  } catch (e) {
    processError(e);
    throw e;
  }
}
