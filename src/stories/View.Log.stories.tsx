// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { View } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'View/Log',
  component: View.Log,
  argTypes: {
    columns: {
      control: {
        type: 'multi-select',
        options: ['oid', 'message', 'author', 'committer', 'date'],
      },
    },
    alert: { action: 'alert' },
    prompt: { action: 'prompt' },
  },
} as Meta;

const Template: Story<View.LogProps> = (args) => <View.Log {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  columns: ['oid', 'message', 'author'],
};
