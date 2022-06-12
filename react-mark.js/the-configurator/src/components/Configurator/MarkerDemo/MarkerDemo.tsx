import { Typography } from '@mui/material';
import {
  MarkOptions,
  RangeMarkerItem,
  RangesMarkerOptions,
  RegExpMarkerOptions,
} from 'mark.js';
import React, { useMemo } from 'react';
import { Marker, RangesMarker, RegExpMarker } from 'react-mark.js';
import { MarkerType } from '../MarkerCoderRenderer';

export type MarkerDemoProps = {
  mark?: string | RegExp | RangeMarkerItem[];
  options?: RegExpMarkerOptions | RangesMarkerOptions | MarkOptions;
  markerType?: MarkerType;
};

const Content = () => (
  <Typography>
    Lorem ipsum dolor sit āmet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, one, nò sea takimata 1 sanctus est Lorem ipsum dolor
    sit amet. Lörem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    lor­em ipsum nonumy eirmod tempor invidunt ut labore et dolore magna
    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
    lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
    magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
    elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
    aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
    diam nonumy. Lore'm ipsu%m dolor sit amet. Lo!rem ipsum.
  </Typography>
);

export const MarkerDemo = ({
  mark = '',
  options = {},
  markerType = 'Marker',
}: MarkerDemoProps) => {
  const $mark = useMemo(() => {
    try {
      if (typeof mark === 'string') {
        const parsed = JSON.parse(mark);
        return parsed;
      }
      // is a valid object
    } catch (e) {
      // is most probably a string
      return mark;
    }
  }, [mark]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { showMarker, showRangesMarker, showRegExpMarker } = useMemo(() => {
    return {
      showMarker: markerType === 'Marker',
      showRangesMarker: markerType === 'RangesMarker',
      showRegExpMarker: markerType === 'RegExpMarker',
    };
  }, [markerType]);
  return (
    <>
      {showMarker ? (
        <Marker mark={$mark} options={options}>
          <Content />
        </Marker>
      ) : null}
      {showRegExpMarker ? (
        <RegExpMarker mark={mark as RegExp}>
          <Content />
        </RegExpMarker>
      ) : null}
      {showRangesMarker ? (
        <RangesMarker mark={mark as RangeMarkerItem[]} options={options}>
          <Content />
        </RangesMarker>
      ) : null}
    </>
  );
};
