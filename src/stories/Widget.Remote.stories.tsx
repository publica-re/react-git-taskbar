// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Widget } from '../Components';

export default {
  title: 'Widget/Remote',
  component: Widget.Remote,
  argTypes: {},
} as Meta;

const Template: Story<Widget.RemoteProps> = (args) => (
  <Widget.Remote {...args} />
);

export const Default = Template.bind({});
Default.args = {};
