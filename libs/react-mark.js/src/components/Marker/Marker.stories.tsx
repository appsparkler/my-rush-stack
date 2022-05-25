import { Marker, MarkerProps } from './Marker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Template: ComponentStory<typeof Marker> = (args) => (
  <Marker<TypographyProps> {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi ea
    consequatur doloribus animi accusantium at dicta omnis eius. Voluptas
    consectetur dignissimos modi quos veritatis nisi velit facilis blanditiis
    corporis!
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi ea
      consequatur doloribus animi accusantium at dicta omnis eius. Voluptas
      consectetur dignissimos modi quos veritatis nisi velit facilis blanditiis
      corporis!
    </h1>
  </Marker>
);

export const marker: ComponentStory<typeof Marker> = Template.bind({});
marker.args = {
  As: Typography,
  mark: 'Lorem',
  variant: 'body1',
} as MarkerProps<TypographyProps>;

export const markWithArrayOfStrings = Template.bind({});
markWithArrayOfStrings.args = {
  mark: ['elis', 'facilis', 'omnis', 'ipsum dolor sit'],
};

export const excludeH1: ComponentStory<typeof Marker> = Template.bind({});
excludeH1.args = {
  As: Typography,
  mark: ['elis', 'facilis', 'omnis', 'ipsum dolor sit'],
  options: {
    exclude: ['h1'],
  },
};

export default {
  component: Marker,
  title: 'Components/Marker',
} as ComponentMeta<typeof Marker>;
