import React from "react";
import { Observable } from "rxjs";

export default function useAsyncMemo<T = unknown>(
  factory: () => Observable<T> | Promise<T> | T,
  deps?: React.DependencyList,
  onError?: (e: unknown) => void
) {
  const [value, setValue] = React.useState<T>();
  React.useEffect(() => {
    const data = factory();
    if (data instanceof Observable) {
      const sub = data.subscribe({ next: setValue, error: onError });
      return sub.unsubscribe.bind(sub);
    } else {
      Promise.resolve(data).then(setValue).catch(onError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return value;
}
