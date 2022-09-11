import { RegExpForm } from './RegExpForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

const Template: ComponentStory<typeof RegExpForm> = (args) => (
  <RegExpForm {...args} />
);

export const regExpForm: ComponentStory<typeof RegExpForm> = Template.bind({});

const Story = {
  component: RegExpForm,
  title: 'Web/Configurator/Forms/Reg Exp Form',
} as ComponentMeta<typeof RegExpForm>;

export default Story;
