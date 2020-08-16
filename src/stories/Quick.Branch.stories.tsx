// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Quick } from '../Components';

export default {
  title: 'Quick/Branch',
  component: Quick.Branch,
  argTypes: {
    alert: { action: 'alert' },
    prompt: { action: 'prompt' },
  },
} as Meta;

const Template: Story<Quick.BranchProps> = (args) => <Quick.Branch {...args} />;

export const Default = Template.bind({});
Default.args = {};
