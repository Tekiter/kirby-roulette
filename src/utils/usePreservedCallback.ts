import { useCallback, useRef } from "react";

export const usePreservedCallback = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const ref = useRef(callback);

  ref.current = callback;

  return useCallback(
    ((...args) => {
      return ref.current(...args);
    }) as T,
    []
  );
};
