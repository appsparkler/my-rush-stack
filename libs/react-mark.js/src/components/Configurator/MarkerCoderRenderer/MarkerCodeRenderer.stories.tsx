import React from 'react';
import { MarkerCodeRenderer } from './MarkerCodeRenderer';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Web/Configurator/Marker Code Renderer',
  component: MarkerCodeRenderer,
} as ComponentMeta<typeof MarkerCodeRenderer>;

const Template: ComponentStory<typeof MarkerCodeRenderer> = (args) => (
  <MarkerCodeRenderer {...args} />
);

export const markerCodeRenderer = Template.bind({});
markerCodeRenderer.args = {
  mark: 'Hello World',
  options: { foo: 'foo', ignore: ['h1', 'h4', 'span'] },
};
