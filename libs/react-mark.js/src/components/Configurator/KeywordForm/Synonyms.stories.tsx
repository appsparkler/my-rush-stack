import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Synonyms } from './Synonyms';

export default {
  component: Synonyms,
  title: 'Web/Configurator/Synonyms',
} as ComponentMeta<typeof Synonyms>;

const Template: ComponentStory<typeof Synonyms> = (args) => (
  <Synonyms {...args} />
);

export const synonyms = Template.bind({});
synonyms.args = {
  name: 'synonyms',
};
