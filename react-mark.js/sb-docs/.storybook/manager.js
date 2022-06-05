import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const DarkTheme = create({
    base: "dark",
    brandTitle: "My custom storybook",
    brandUrl: "/",
    brandImage: "/react-mark-js-logo.png"
});

addons.setConfig({
    theme: DarkTheme,
});
