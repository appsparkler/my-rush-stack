import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const DarkTheme = create({
    base: "dark",
    brandTitle: "React Mark JS Docs",
    brandUrl: "https://www.appsparkler.com/docs/react-mark-js/?path=/docs/introduction--single-string",
    brandImage: "https://www.appsparkler.com/docs/react-mark-js/react-mark-js-logo.png"
});

addons.setConfig({
    theme: DarkTheme,
});
