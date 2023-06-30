import React from "react";

/**
 * @returns state должен вернуть либо 'auto' или null
 */
export default function useCheck() {
  const [state, setState] = React.useState<"auto" | null>(null);
  const getRowHeight = React.useCallback(() => state, [state]);

  const refreshHeight = React.useCallback(() => {
    setState((prev) => (prev ? null : "auto"));
  }, []);

  return { getRowHeight, refreshHeight };
}
