/* eslint-env node */

/** @type {import('eslint').Linter.Config */
const config = {
  extends: ['eslint-config-rdp', 'plugin:storybook/recommended']
};
module.exports = config;