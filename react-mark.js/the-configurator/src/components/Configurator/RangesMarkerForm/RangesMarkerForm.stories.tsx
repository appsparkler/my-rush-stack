import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RangesMarkerForm } from './RangesMarkerForm';

const Story: ComponentMeta<typeof RangesMarkerForm> = {
  component: RangesMarkerForm,
  title: 'Web/Configurator/Forms/Ranges Marker Form',
};

const Template: ComponentStory<typeof RangesMarkerForm> = (args) => (
  <RangesMarkerForm {...args} />
);

export const rangesMarkerForm = Template.bind({});
rangesMarkerForm.args = {};

export default Story;
