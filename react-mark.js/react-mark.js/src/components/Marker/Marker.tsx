import React, {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import MarkJS from "mark.js";
import { DivAttributes, MarkOptions, UnmarkOptions } from "types";
import { MarkerProps } from "types/Marker";

/**
 * @public
 */
export function Marker<T = DivAttributes>({
  as = "div",
  mark = "",
  options = {},
  children,
  unmarkOptions = {},
  elementProps,
}: MarkerProps<T>): JSX.Element {
  <div></div>;
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [markInstance, setMarkInstance] = useState<any>();

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
}
