import { Marker } from "./Marker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

const Template: ComponentStory<typeof Marker> = (args) => (
  <Marker {...args}>
    <h1>Lorem ipsum dolor sit</h1>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi ea
    consequatur doloribus animi accusantium at dicta omnis eius. Voluptas
    consectetur dignissimos modi quos veritatis nisi velit facilis blanditiis
    corporis!
  </Marker>
);
Template.args = {
  mark: "Lorem Ipsum",
};

export const Basic = Template.bind({});
Basic.args = {
  mark: "Lorem",
};

export const MarkWithArrayOfStrings = Template.bind({});
MarkWithArrayOfStrings.args = {
  mark: ["elis", "facilis", "omnis", "ipsum dolor sit"],
};

export const ExcludeH1 = Template.bind({});
ExcludeH1.args = {
  mark: ["Lorem", "elis", "facilis", "omnis", "ipsum dolor sit"],
  options: {
    exclude: ["h1"],
  },
};

// export const asTypography: ComponentStory<typeof Marker> = Template.bind({});
// asTypography.args = {
//   as: Typography,
//   mark: "Lorem Ipsum",
//   variant: "body1",
// } as MarkerProps<TypographyProps>;

export default {
  component: Marker,
  title: "Stories/Components/Marker",
} as ComponentMeta<typeof Marker>;
