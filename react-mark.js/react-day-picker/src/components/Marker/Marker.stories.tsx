// import { Marker, MarkerProps } from './Marker';
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import React from 'react';
// import { Typography, TypographyProps } from '@mui/material';

// const Template: ComponentStory<typeof Marker> = (args) => (
//   <Marker {...args}>
//     <h1>Lorem ipsum dolor sit</h1>
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi ea
//     consequatur doloribus animi accusantium at dicta omnis eius. Voluptas
//     consectetur dignissimos modi quos veritatis nisi velit facilis blanditiis
//     corporis!
//   </Marker>
// );
// Template.args = {
//   mark: 'Lorem Ipsum',
// };

// export const marker: ComponentStory<typeof Marker> = Template.bind({});
// marker.args = {
//   mark: 'Lorem',
// } as MarkerProps;

// export const markWithArrayOfStrings = Template.bind({});
// markWithArrayOfStrings.args = {
//   mark: ['elis', 'facilis', 'omnis', 'ipsum dolor sit'],
// };

// export const excludeH1: ComponentStory<typeof Marker> = Template.bind({});
// excludeH1.args = {
//   mark: ['Lorem', 'elis', 'facilis', 'omnis', 'ipsum dolor sit'],
//   options: {
//     exclude: ['h1'],
//   },
// };

// export const asTypography: ComponentStory<typeof Marker> = Template.bind({});
// asTypography.args = {
//   as: Typography,
//   mark: 'Lorem Ipsum',
//   variant: 'body1',
// } as MarkerProps<TypographyProps>;

// export default {
//   component: Marker,
//   title: 'Stories/Components/Marker',
// } as ComponentMeta<typeof Marker>;
