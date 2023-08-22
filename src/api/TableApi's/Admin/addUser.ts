import { of } from "rxjs";

interface addUserProps {
  login: string;
  role: number;
}
export default function addUser(props: addUserProps) {
  return of().pipe();
}
