import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RegExpMarker } from './RegExpMarker';

const Story = {
  component: RegExpMarker,
  title: 'Components/Reg Exp Marker',
} as ComponentMeta<typeof RegExpMarker>;

const Template: ComponentStory<typeof RegExpMarker> = (args = {}) => (
  <RegExpMarker {...args} />
);

export const regExpMarker: ComponentStory<typeof RegExpMarker> = Template.bind(
  {}
);
regExpMarker.args = {};

export default Story;
