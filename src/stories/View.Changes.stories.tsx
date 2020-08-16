// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { View } from '../Components';

export default {
  title: 'View/Changes',
  component: View.Changes,
  argTypes: {
    message: { control: 'text' },
  },
} as Meta;

const Template: Story<View.ChangesProps> = (args) => <View.Changes {...args} />;

export const Default = Template.bind({});
Default.args = {};
