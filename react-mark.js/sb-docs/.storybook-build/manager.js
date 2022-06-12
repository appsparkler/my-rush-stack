import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const siteDir = "https://www.appsparkler.com/docs/react-mark-js";


const DarkTheme = create({
    base: "dark",
    brandTitle: "React Mark JS Docs",
    brandUrl: `${siteDir}/?path=/docs/introduction--single-string`,
    brandImage: `${siteDir}/react-mark-js-logo.png`
});

addons.setConfig({
    theme: DarkTheme,
});
