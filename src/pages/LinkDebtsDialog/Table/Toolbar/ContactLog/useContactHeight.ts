import React from "react";

export default function useContactHeight() {
  const [state, setState] = React.useState<"auto" | null>(null);

  const getRowHeight = React.useCallback(() => state, [state]);

  const changeRowHeight = React.useCallback(() => {
    setState((prev) => (prev ? null : "auto"));
  }, []);
  return {
    getRowHeight,
    changeRowHeight,
  };
}
