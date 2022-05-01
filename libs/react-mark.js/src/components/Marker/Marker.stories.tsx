import { Marker } from './Marker';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

const Template: ComponentStory<typeof Marker> = (args) => (
  <Marker {...args}>
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

export const marker = Template.bind({});
marker.args = {
  mark: 'elit',
};

export const markWithArrayOfStrings = Template.bind({});
markWithArrayOfStrings.args = {
  mark: ['elis', 'facilis', 'omnis', 'ipsum dolor sit'],
};

export const excludeH1 = Template.bind({});
excludeH1.args = {
  mark: ['elis', 'facilis', 'omnis', 'ipsum dolor sit'],
  options: {
    exclude: ['h1']
  }
};

export default {
  title: 'Components/Marker',
  component: Marker,
} as ComponentMeta<typeof Marker>;
