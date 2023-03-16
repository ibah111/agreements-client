import { baseRequest } from "../utils/baseRequest";

export default async function deleteAgreements(id: number) {
  try {
    const res = await baseRequest.delete<boolean>(
      `/Agreements/deleteAgreement/${id}`
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}
