import React from 'react';
import { Horizontal } from './Horizontal';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template: ComponentStory<typeof Horizontal> = (args) => (
  <Horizontal {...args} />
);

export const horizontal = Template.bind({});
horizontal.args = {
  children: [
    <div>Horizontal</div>,
    <div>Horizontal</div>,
    <div>Horizontal</div>,
    <div>Horizontal</div>,
  ],
  gap: 3,
};

export default {
  title: 'Layout/Horizontal',
  component: Horizontal,
} as ComponentMeta<typeof Horizontal>;
