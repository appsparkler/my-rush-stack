import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { KeywordForm } from './KeywordForm';

export default {
  title: 'Web/Configurator/Keyword Form',
  component: KeywordForm,
} as ComponentMeta<typeof KeywordForm>;

const Template: ComponentStory<typeof KeywordForm> = (args) => (
  <KeywordForm {...args} />
);

export const keywordForm = Template.bind({});
