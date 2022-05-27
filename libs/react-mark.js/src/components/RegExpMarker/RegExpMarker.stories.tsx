import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RegExpMarker } from './RegExpMarker';
import { Typography } from '@mui/material';

const Story = {
  component: RegExpMarker,
  title: 'Components/RegExpMarker',
} as ComponentMeta<typeof RegExpMarker>;

const Template: ComponentStory<typeof RegExpMarker> = (args) => (
  <RegExpMarker {...args} />
);

export const regExpMarker: ComponentStory<typeof RegExpMarker> = Template.bind(
  {}
);
regExpMarker.args = {
  children: (
    <Typography>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, ea
      exercitationem. Odio, libero incidunt nostrum recusandae ea, atque rerum
      repellat ratione adipisci dolor exercitationem reprehenderit! Iure ut
      exercitationem dicta in.
    </Typography>
  ),
  mark: /adipisicing/,
};
regExpMarker.storyName = 'RegExpMarker';

export default Story;
