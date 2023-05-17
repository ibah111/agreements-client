import FIO from "./FIo";
import KD from "./KD";
import SubmitButton from "./SubmitButton";

interface FormProps {
  refresh: VoidFunction;
}

export default function Form(props: FormProps) {
  return (
    <>
      <FIO refresh={props.refresh} />
      <KD refresh={props.refresh} />
      <SubmitButton refresh={props.refresh} />
    </>
  );
}
