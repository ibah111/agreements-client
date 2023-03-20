import React from "react";

export default function useAsyncMemo<T = unknown>(
  factory: () => Promise<T> | T,
  deps?: React.DependencyList
) {
  const [value, setValue] = React.useState<T>();
  React.useEffect(() => {
    Promise.resolve(factory()).then(setValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}
