import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RangesMarker } from './RangesMarker';

const Story = {
  component: RangesMarker,
  title: 'Components/RangesMarker',
} as ComponentMeta<typeof RangesMarker>;

const Template: ComponentStory<typeof RangesMarker> = (args = {}) => (
  <RangesMarker {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quisquam
    neque voluptatum incidunt itaque eius quae similique dolore quam modi velit
    ex consectetur ipsum maxime, qui animi dolorum ad cupiditate.
  </RangesMarker>
);

export const rangesMarker: ComponentStory<typeof RangesMarker> = Template.bind(
  {}
);
rangesMarker.args = {
  mark: [
    { length: 10, start: 5 },
    { length: 10, start: 20 },
    { length: 5, start: 40 },
  ],
};
rangesMarker.storyName = 'RangesMarker';

export default Story;
