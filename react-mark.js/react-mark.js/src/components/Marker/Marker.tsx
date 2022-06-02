import React, {
  createElement,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import MarkJS from "mark.js";
import { MarkOptions, UnmarkOptions } from "types";

/**
 * @public
 */
export type MarkerProps<T> = {
  children?: React.ReactNode;
  as?: string | ElementType;
  mark?: string | string[];
  options?: MarkOptions;
  unmarkOptions?: UnmarkOptions;
  elementProps?: T;
};

type DivAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

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
