import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DynamicKeyValueList } from './Synonyms';

export default {
  component: DynamicKeyValueList,
  title: 'Web/Configurator/Synonyms',
} as ComponentMeta<typeof DynamicKeyValueList>;

const Template: ComponentStory<typeof DynamicKeyValueList> = (args) => (
  <DynamicKeyValueList {...args} />
);

export const synonyms = Template.bind({});
synonyms.args = {
  name: 'synonyms',
};

export const withNumberType: ComponentStory<typeof DynamicKeyValueList> =
  Template.bind({});

withNumberType.args = {
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
