# My Rush Stack

## Getting Started

After cloning the respository; ensure you have the following global dependencies installed:

```bash
npm i -g @microsoft/rush pnpm heft
```

## Update Project

```bash
rush update
```

## Select The Project You Would Like To Develop

1. [React Mark JS][react-mark-js]
2. [MUI][mui]

[react-mark-js]: libs/react-mark.js#react-mark-js
[mui]: libs/mui#mui

## Adding a New Project (as per HEFT)

1. Create a project-folder in any of the categories (or chosse a new one) - for ex. `widgets/react-mark-js-configurator`
1. Now, add the project files and folders here. For ex. `package.json` and `tsconfig.json`
1. Update the `rush.json` in the root of the project with few project details.

```json
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
