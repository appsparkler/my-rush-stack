import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CompositeForm } from './CompositeForm';

const Story = {
  component: CompositeForm,
  title: 'Web/Configurator/Forms/Composite Form',
} as ComponentMeta<typeof CompositeForm>;

const Template: ComponentStory<typeof CompositeForm> = (args) => (
  <CompositeForm {...args} />
);

export const compositeForm: ComponentStory<typeof CompositeForm> =
  Template.bind({});
compositeForm.args = {};

export default Story;
