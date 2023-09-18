import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;
type BasicFunc = (e: Event) => any;

export const useOnclickOutside = <
  K extends BasicFunc,
  T extends HTMLElement = HTMLElement
>(
  ref: RefObject<T>,
  handler: K
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
};
