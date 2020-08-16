// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Dialog } from '../Components';

export default {
  title: 'Dialog/Snackbar',
  component: Dialog.Snackbar,
  argTypes: {
    messages: { control: 'array', separator: ',' },
    duration: { control: 'range', min: 0, max: 10000, step: 100 },
  },
} as Meta;

const Template: Story<Dialog.SnackbarProps> = (args) => (
  <Dialog.Snackbar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  messages: ['hello', 'world'],
  duration: 10000,
};
