import React from 'react';
import { MarkerCodeRenderer } from './MarkerCodeRenderer';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: MarkerCodeRenderer,
  title: 'Web/Configurator/Prisms',
} as ComponentMeta<typeof MarkerCodeRenderer>;

const Template: ComponentStory<typeof MarkerCodeRenderer> = (args) => (
  <MarkerCodeRenderer {...args} />
);

export const markerCodeRenderer = Template.bind({});
markerCodeRenderer.args = {
  mark: 'Hello World',
  options: { foo: 'foo', ignore: ['h1', 'h4', 'span'] },
};

export const rangesMarkerCodeRenderer: ComponentStory<
  typeof MarkerCodeRenderer
> = Template.bind({});
rangesMarkerCodeRenderer.args = {
  isRangesMarker: true,
  mark: 'Hello World',
  markerType: 'RangesMarker',
  options: { foo: 'foo', ignore: ['h1', 'h4', 'span'] },
  ranges: [{ length: 10, start: 6 }],
};
