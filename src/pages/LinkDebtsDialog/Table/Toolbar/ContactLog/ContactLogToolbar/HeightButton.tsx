import { Button } from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import React from "react";

export default function HeightButton({
  changeRowHeight,
}: {
  changeRowHeight: () => void;
}) {
  const [state, setState] = React.useState<"Стандарт" | "Авто">("Стандарт");
  /**
   * В чём разница разница между onClickCapture // onClick +
   * ответ: difference is that onClickCapture acts in the capture phase
   * whereas onClick acts in the bubbling phase i.e. phases of an event.
   */
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<HeightIcon />}
      onClick={changeRowHeight}
      onClickCapture={() => {
        setState("Авто");
        if (state === "Авто") setState("Стандарт");
      }}
    >
      Высота ячеек: {state}
    </Button>
  );
}
/**
 * Код конечно странный, но пусть так работает
 */
