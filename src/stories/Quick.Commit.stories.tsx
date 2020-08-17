// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Quick } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Quick/Commit',
  component: Quick.Commit,
  argTypes: {},
} as Meta;

const Template: Story<Quick.CommitProps> = (args) => <Quick.Commit {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {};
