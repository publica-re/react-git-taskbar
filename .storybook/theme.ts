import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#05ab98',
  colorSecondary: '#1ab5a3',

  // UI
  appBg: '#f8f8f3',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'black',
  barBg: '#05ab98',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'react-git-taskbar',
  brandUrl: 'https://publica.re',
  brandImage:
    'https://git.publica.re/uploads/-/system/appearance/logo/1/publicare.png',
});
