import React, { useEffect, useRef, useState } from 'react';
import MarkJS, {MarkOptions} from 'mark.js';

export const Marker = ({
  children,
  mark = '',
  options,
}: {
  children?: React.ReactNode;
  mark?: string | string[];
  options?: MarkOptions;
}) => {
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
  }, [mark, options]);

  return <div ref={markerRef}>{children}</div>;
};
