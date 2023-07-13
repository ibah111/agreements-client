import { of } from "rxjs";
interface getCommentsArgs {
  id_agreement: number;
}
export default function getComments(args: getCommentsArgs) {
  return of(args.id_agreement).subscribe;
}
