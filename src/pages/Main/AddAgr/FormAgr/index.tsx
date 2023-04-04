import DateAgr from "./DateAgr";
import NameAgr from "./NameAgr";
import SubmitButtonAgr from "./SubmitButtonAgr";
interface AddAgrProps {
  refresh: VoidFunction;
}
export default function FormAgr(props: AddAgrProps) {
  return (
    <>
      <NameAgr />
      <DateAgr />
      <SubmitButtonAgr refresh={props.refresh} />
    </>
  );
}
