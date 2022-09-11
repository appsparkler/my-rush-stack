import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const DarkTheme = create({
    base: "dark",
    brandTitle: "React Mark JS",
    brandUrl: "/?path=/docs/introduction--single-string",
    brandImage: "/react-mark-js-logo.png"
});

addons.setConfig({
    theme: DarkTheme,
});
