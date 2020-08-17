// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { View } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'View/Diff',
  component: View.Diff,
  argTypes: {
    left: { control: 'text' },
    right: { control: 'text' },
    onClose: { action: 'close' },
  },
} as Meta;

const Template: Story<View.DiffProps> = (args) => <View.Diff {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  left: 'a728aefc8ffacd7740458e8d8e355e7f5a0ca08d',
  right: '419744c2f24e694f2fbb36d3183b43cdc54293a0',
};
