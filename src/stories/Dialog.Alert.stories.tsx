// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Dialog } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Dialog/Alert',
  component: Dialog.Alert,
  argTypes: {
    isVisible: { control: 'boolean' },
    title: { control: 'text' },
    canChoose: { control: 'boolean' },
    onClose: { action: 'close' },
    onConfirm: { action: 'confirm' },
  },
} as Meta;

const Template: Story<Dialog.AlertProps> = (args) => <Dialog.Alert {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  isVisible: true,
  title: 'Open an alert',
  canChoose: false,
};
