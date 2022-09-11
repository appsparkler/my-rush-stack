import React from 'react';
import { SimpleCheckbox } from './SimpleCheckbox';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template: ComponentStory<typeof SimpleCheckbox> = (args) => (
  <SimpleCheckbox {...args} />
);

export const simpleCheckbox: ComponentStory<typeof SimpleCheckbox> =
  Template.bind({});
simpleCheckbox.args = {
  name: 'ignoreSpaces',
  checked: false,
  label: 'Ignore Spaces',
};

export default {
  title: 'Controls/Simple Checkbox',
  component: SimpleCheckbox,
} as ComponentMeta<typeof SimpleCheckbox>;
