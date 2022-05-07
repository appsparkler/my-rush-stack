import React from 'react';
import { SimpleTextField } from './SimpleTextField';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template: ComponentStory<typeof SimpleTextField> = (args) => (
  <SimpleTextField {...args} />
);

export const simpleTextField = Template.bind({});
simpleTextField.args = {
  name: 'firstName',
  label: 'First Name',
};

export default {
  title: 'Controls/Simple Text Field',
  component: SimpleTextField,
} as ComponentMeta<typeof SimpleTextField>;
