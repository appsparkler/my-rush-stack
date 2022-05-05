import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Excludes } from './Excludes';

export default {
  title: 'Web/Configurator/Excludes',
  component: Excludes,
} as ComponentMeta<typeof Excludes>;

const Template: ComponentStory<typeof Excludes> = (args) => (
  <Excludes {...args} />
);

export const keywordForm = Template.bind({});
