import React from 'react';
import { SimpleSelect } from './SimpleSelectField';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { uniqueId } from 'lodash';

const Template: ComponentStory<typeof SimpleSelect> = (args) => (
  <SimpleSelect {...args} />
);

export const simpleSelect: ComponentStory<typeof SimpleSelect> = Template.bind(
  {}
);
simpleSelect.args = {
  label: 'Accuracy',
  menuItems: [
    { id: uniqueId('accuracy-item'), name: 'Exactly', value: 'exactly' },
    { id: uniqueId('accuracy-item'), name: 'Partially', value: 'partially' },
    {
      id: uniqueId('accuracy-item'),
      name: 'Complimentary',
      value: 'complimentary',
    },
  ],
  name: 'accuracy',
  value: 'complimentary',
};

export default {
  title: 'Controls/Simple Select',
  component: SimpleSelect,
} as ComponentMeta<typeof SimpleSelect>;
