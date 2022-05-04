import React from 'react';
import { Vertical } from './Vertical';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template: ComponentStory<typeof Vertical> = (args) => (
  <Vertical {...args} />
);

export const vertical = Template.bind({});
vertical.args = {
  children: [
    <div>Vertical</div>,
    <div>Vertical</div>,
    <div>Vertical</div>,
    <div>Vertical</div>,
  ],
  gap: 3,
};

export default {
  title: 'Layout/Vertical',
  component: Vertical,
} as ComponentMeta<typeof Vertical>;
