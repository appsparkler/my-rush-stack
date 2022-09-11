import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MarkerDemo } from './MarkerDemo';

const Story = {
  component: MarkerDemo,
  title: 'Web/Configurator/Marker Demo',
} as ComponentMeta<typeof MarkerDemo>;

const Template: ComponentStory<typeof MarkerDemo> = (args = {}) => (
  <MarkerDemo {...args} />
);

export const markerDemo: ComponentStory<typeof MarkerDemo> = Template.bind({});
markerDemo.args = {
  mark: 'sit amet',
  options: {
    diacritics: false,
  },
};

export default Story;
