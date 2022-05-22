import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MarkerDemo } from './MarkerDemo';

const Story = {
  component: MarkerDemo,
  title: 'Configurator/MarkerDemo',
} as ComponentMeta<typeof MarkerDemo>;

const Template: ComponentStory<typeof MarkerDemo> = (args = {}) => (
  <MarkerDemo {...args} />
);

export const markerDemo: ComponentStory<typeof MarkerDemo> = Template.bind({});
markerDemo.args = {};

export default Story;
