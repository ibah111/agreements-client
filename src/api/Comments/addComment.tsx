import { of } from "rxjs";
interface addCommentArgs {
  comment: string;
  id_agreement: number;
}
export default function addComment(args: addCommentArgs) {
  return of(args).subscribe;
}
