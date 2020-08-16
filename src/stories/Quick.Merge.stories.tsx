// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Quick } from '../Components';

export default {
  title: 'Quick/Merge',
  component: Quick.Merge,
  argTypes: {
    alert: { action: 'alert' },
  },
} as Meta;

const Template: Story<Quick.MergeProps> = (args) => <Quick.Merge {...args} />;

export const Default = Template.bind({});
Default.args = {};
