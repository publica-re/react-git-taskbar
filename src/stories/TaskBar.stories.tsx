// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { TaskBar } from '../Components';
import { TaskBarProps } from '../Components/TaskBar';

export default {
  title: 'TaskBar',
  component: (TaskBar as unknown) as React.FC,
  argTypes: {
    repositoryUri: { control: 'text' },
    onEdit: { action: 'edit' },
    author: { control: 'object' },
    corsProxy: { control: 'text' },
    behaviour: { control: { type: 'radio', options: [undefined, 'gitlab'] } },
  },
} as Meta;

const Template: Story<TaskBarProps> = (args) => <TaskBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  repositoryUri: 'https://git.publica.re/playground/playground.git',
  corsProxy: 'http://git.publica.re/proxy',
  author: { name: '@publica.re/react-git-taskbar', email: 'dev@publica.re' },
  behaviour: undefined,
};
