// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Widget } from '../Components';

export default {
  title: 'Widget/Branch',
  component: Widget.Branch,
  argTypes: {
    filter: {
      control: { type: 'radio', options: [undefined, 'remote', 'local'] },
    },
    selection: { control: 'text' },
    allowNewBranch: { control: 'boolean' },
    onSelect: { action: 'select' },
  },
} as Meta;

const Template: Story<Widget.BranchProps> = (args) => (
  <Widget.Branch {...args} />
);

export const Default = Template.bind({});
Default.args = {
  filter: undefined,
  allowNewBranch: false,
  selection: 'local/master',
};
