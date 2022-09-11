import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DynamicKeyValueList } from './DynamicKeyValueList';

export default {
  component: DynamicKeyValueList,
  title: 'Common/Dynamic Key Value List',
} as ComponentMeta<typeof DynamicKeyValueList>;

const Template: ComponentStory<typeof DynamicKeyValueList> = (args) => (
  <DynamicKeyValueList {...args} />
);

export const noProps = Template.bind({});
noProps.args = {};

export const textType = Template.bind({});
textType.args = {
  name: 'synonyms',
};

export const numberType: ComponentStory<typeof DynamicKeyValueList> =
  Template.bind({});

numberType.args = {
  name: 'ranges',
  title: 'Ranges',
  value: [
    {
      field1: {
        size: 'small',
        type: 'number',
        value: 3,
      },
      field2: {
        size: 'small',
        type: 'number',
        value: 10,
      },
      id: '1',
    },
  ],
};
