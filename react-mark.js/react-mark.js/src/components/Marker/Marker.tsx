import { createElement, useEffect, useRef, useState } from "react";
import MarkJS from "mark.js";
import { DivAttributes, MarkerProps } from "types";

/**
 * @public
 */
export const Marker = <T extends {} = DivAttributes>({
  as = "div",
  mark = "",
  options = {},
  children,
  unmarkOptions = {},
  elementProps,
}: MarkerProps<T>): JSX.Element => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [markInstance, setMarkInstance] = useState<MarkJS>();

  useEffect(() => {
    if (markerRef.current) {
      const markInstance = new MarkJS(markerRef.current);
      setMarkInstance(markInstance);
    }
  }, []);

  useEffect(() => {
    if (markInstance) {
      Promise.resolve(markInstance.unmark(unmarkOptions)).then(() => {
        markInstance.mark(mark, options);
      });
    }
  }, [mark, markInstance, options, unmarkOptions]);

  return createElement(as, { ref: markerRef, children, ...elementProps });
};
