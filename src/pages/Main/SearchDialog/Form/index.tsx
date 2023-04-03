import FIO from "./FIo";
import KD from "./KD";
import SubmitButton from "./SubmitButton";

interface FormProps {
  refresh: VoidFunction;
}

export default function Form(props: FormProps) {
  return (
    <>
      <FIO />
      <KD />
      <SubmitButton refresh={props.refresh} />
    </>
  );
}
