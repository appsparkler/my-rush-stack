import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DynamicKeyValueList } from './DynamicKeyValueList';

export default {
  component: DynamicKeyValueList,
  title: 'Web/Common/Dynamic Key Value List',
} as ComponentMeta<typeof DynamicKeyValueList>;

const Template: ComponentStory<typeof DynamicKeyValueList> = (args) => (
  <DynamicKeyValueList {...args} />
);

export const textType = Template.bind({});
textType.args = {
  name: 'synonyms',
};

export const numberType: ComponentStory<typeof DynamicKeyValueList> =
  Template.bind({});

numberType.args = {
  keyInputProps: {
    label: 'start',
    name: 'key',
    size: 'small',
    type: 'number',
  },
  name: 'ranges',
  title: 'Ranges',
  valueInputProps: {
    label: 'length',
    name: 'value',
    size: 'small',
    type: 'number',
  },
};
