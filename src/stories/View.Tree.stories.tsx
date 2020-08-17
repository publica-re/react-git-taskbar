// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { View } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'View/Tree',
  component: View.Tree,
  argTypes: {
    onEdit: { action: 'edit' },
    prompt: { action: 'prompt' },
    alert: { action: 'alert' },
    pickFile: { action: 'pickFile' },
  },
} as Meta;

const Template: Story<View.TreeProps> = (args) => <View.Tree {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {};
