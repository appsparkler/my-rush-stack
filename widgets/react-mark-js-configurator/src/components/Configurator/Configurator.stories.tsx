import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Configurator } from './Configurator';

const Template: ComponentStory<typeof Configurator> = () => <Configurator />;

export const configurator = Template.bind({});

export default {
  title: 'Web/Configurator',
} as ComponentMeta<typeof Configurator>;
