import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import {
  getDefaultInteactiveSimpleListItem,
  InteactiveSimpleList,
} from './InteactiveSimpleList';

export default {
  title: 'Lists/Interactive Simple List',
  component: InteactiveSimpleList,
} as ComponentMeta<typeof InteactiveSimpleList>;

const Template: ComponentStory<typeof InteactiveSimpleList> = (args) => (
  <InteactiveSimpleList {...args} />
);

export const interactiveSimpleList = Template.bind({});
interactiveSimpleList.args = {
  name: 'excludes',
  title: 'Exclusions',
  label: 'Exclude Item',
  ariaLabelAdd: 'add exclusion',
  btnLabel: 'Add Exclusion',
  ariaLabelDelete: 'delete exclusion',
  value: [
    getDefaultInteactiveSimpleListItem(),
    {
      ...getDefaultInteactiveSimpleListItem(),
      error: true,
      helperText: 'Something seems wrong',
    },
  ],
};
