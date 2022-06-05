import { create } from "@storybook/theming";
import LogoPNG from './react-mark-js-logo.png'
import { addons } from "@storybook/addons";

const DarkTheme = create({
    base: "dark",
    brandTitle: "My custom storybook",
    brandUrl: "http://localhost:2000",
    brandImage: LogoPNG
});

addons.setConfig({
    theme: DarkTheme,
});
