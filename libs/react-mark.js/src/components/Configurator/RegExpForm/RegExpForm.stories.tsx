import { RegExpForm } from './RegExpForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const Template = () => <RegExpForm />;

export const regExpForm: ComponentStory<typeof RegExpForm> = Template.bind({});

const Story = {
  component: RegExpForm,
  title: 'Configurator/Reg Exp Form',
} as ComponentMeta<typeof RegExpForm>;

export default Story;
