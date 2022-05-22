import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Marker, MarkerProps } from '../../Marker';

export type MarkerDemoProps = {
  mark?: string;
  options?: MarkerProps['options'];
};

export const MarkerDemo = ({ mark = '', options = {} }: MarkerDemoProps) => {
  const $mark = useMemo(() => {
    try {
      const parsed = JSON.parse(mark);
      // is a valid object
      return parsed;
    } catch (e) {
      // is most probably a string
      return mark;
    }
  }, [mark]);
  return (
    <Marker mark={$mark} options={options}>
      <Typography>
        Lorem ipsum dolor sit āmet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, one, nò sea takimata 1 sanctus est Lorem ipsum
        dolor sit amet. Lörem ipsum dolor sit amet, consetetur sadipscing elitr,
        sed diam lor­em ipsum nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
        duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy. Lore'm ipsu%m dolor sit
        amet. Lo!rem ipsum.
      </Typography>
    </Marker>
  );
};
