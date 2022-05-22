import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CompositeForm } from './CompositeFormWithCodeCopy';

const Story = {
  component: CompositeForm,
  title: 'Configurator/Composite Form',
} as ComponentMeta<typeof CompositeForm>;

const Template: ComponentStory<typeof CompositeForm> = (args) => (
  <CompositeForm {...args} />
);

export const compositeForm: ComponentStory<typeof CompositeForm> =
  Template.bind({});
compositeForm.args = {};

export default Story;
