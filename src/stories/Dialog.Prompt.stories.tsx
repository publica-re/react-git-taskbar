// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Dialog } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Dialog/Prompt',
  component: Dialog.Prompt,
  argTypes: {
    title: { control: 'text' },
    defaultValue: { control: 'text' },
    isVisible: { control: 'boolean' },
    onApply: { action: 'apply' },
    onAbort: { action: 'abort' },
  },
} as Meta;

const Template: Story<Dialog.PromptProps> = (args) => (
  <Dialog.Prompt {...args} />
);

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  title: 'Title',
  isVisible: true,
};
