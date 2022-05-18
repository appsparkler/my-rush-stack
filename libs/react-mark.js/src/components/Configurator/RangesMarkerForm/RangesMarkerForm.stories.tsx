import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RangesMarkerForm } from './RangesMarkerForm';

const Story: ComponentMeta<typeof RangesMarkerForm> = {
  component: RangesMarkerForm,
  title: 'Ranges Marker Form',
};

const Template: ComponentStory<typeof RangesMarkerForm> = () => (
  <RangesMarkerForm />
);

export const rangesMarkerForm = Template.bind({});

export default Story;
