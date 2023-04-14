import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { Agreement } from "../Models/Agreement";
import { baseRequest } from "../utils/baseRequest";
import { createError, createRetry } from "../utils/processError";

export default function getAgreements() {
  return new Observable<Agreement[]>((stream) => {
    const promise = baseRequest.get<Agreement[]>("/Agreements");
    promise
      .then((res) => {
        const classData = plainToInstance(Agreement, res.data);
        stream.next(classData);
        stream.complete();
      })
      .catch(createError(stream));
  }).pipe(createRetry());
}
