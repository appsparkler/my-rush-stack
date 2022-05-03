import React from 'react';
import { MarkerCodeRendererWithCopy } from './MarkerCodeRendererWithCopy';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Web/Configurator/Marker Code Renderer With Copy',
  component: MarkerCodeRendererWithCopy,
} as ComponentMeta<typeof MarkerCodeRendererWithCopy>;

const Template: ComponentStory<typeof MarkerCodeRendererWithCopy> = (args) => (
  <MarkerCodeRendererWithCopy {...args} />
);

Template.args = {
  mark: 'Hello World',
  options: { foo: 'foo', ignore: ['h1', 'h4', 'span'] },
};

export const markerCodeRendererWithCopy = Template.bind({});
