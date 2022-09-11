# My Rush Stack

## Getting Started

After cloning the respository; ensure you have the following global dependencies installed:

```bash
npm i -g @microsoft/rush @rushstack/heft pnpm @microsoft/api-extractor @microsoft/api-documenter
```

## Update Project

```bash
rush update
```

## Maintenance

### Check if there are multiple versions of a `node_module`

```bash
rush check
```

## Select The Project You Would Like To Develop

1. [React Mark JS][react-mark-js]
2. [MUI][mui]

[react-mark-js]: libs/react-mark.js#react-mark-js
[mui]: libs/mui#mui

## Adding a New Project (as per [Heft](https://rushstack.io/pages/heft_tutorials/getting_started/))

1. Create a project-folder in any of the categories (or chosse a new one) - for ex. `widgets/react-mark-js-configurator`
1. Now, add the project files and folders here. For ex. `package.json` and `tsconfig.json`
1. Update the `rush.json` in the root of the project with few project details.

```jsonc
{
  /*.for ex:..*/
  "projects": [
    /*...*/
    {
      "projectName": "@react-mark.js/configurator",
      "projectFolder": "widgets/react-mark-js-configurator"
    }
    /*...*/
  ]
  /*...*/
}
```

1. Run `rush update` to link this new project into the `rush-stack`.

## What if `rush update` fails:

You can simply open the failed package in integrated terminal and run the `rushx build` command for a more clear diagnosis.

## Generators

A Typescript react-library sample project is available at [@generators/generator-appsparkler](@generators/generator-appsparkler/generators/app/) in this project
