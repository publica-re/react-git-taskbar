// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Dialog } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Dialog/FilePicker',
  component: Dialog.FilePicker,
  argTypes: {
    pickType: { control: { type: 'radio', options: ['file', 'dir'] } },
    isVisible: { control: 'boolean' },
    onChoose: { action: 'choose' },
    onAbort: { action: 'abort' },
  },
} as Meta;

const Template: Story<Dialog.FilePickerProps> = (args) => (
  <Dialog.FilePicker {...args} />
);

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  pickType: 'file',
  isVisible: true,
};
