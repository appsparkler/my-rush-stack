import React, { useEffect, useRef, useState } from 'react';
import MarkJS, { MarkOptions } from 'mark.js';

export type MarkerProps = {
  children?: React.ReactNode;
  mark?: string | string[];
  options?: MarkOptions;
};

export const Marker = ({ children, mark = '', options }: MarkerProps) => {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [markInstance, setMarkInstance] = useState<MarkJS>();

  useEffect(() => {
    if (markerRef.current) {
      setMarkInstance(new MarkJS(markerRef.current));
    }
  }, []);

  useEffect(() => {
    if (markInstance) {
      markInstance.mark(mark, options);
    }
  }, [markInstance, mark, options]);

  useEffect(() => {
    if (markInstance) {
      Promise.resolve(markInstance.unmark()).then(() => {
        markInstance.mark(mark, options);
      });
    }
  }, [mark, markInstance, options]);

  return <div ref={markerRef}>{children}</div>;
};
