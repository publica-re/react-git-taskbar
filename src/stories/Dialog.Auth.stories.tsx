// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Dialog } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Dialog/Auth',
  component: Dialog.Auth,
  argTypes: {
    url: { control: 'text' },
    auth: { control: { type: 'object' } },
    onLoginAttempt: { action: 'attempt-login' },
    behaviour: { control: { type: 'radio', options: [undefined, 'gitlab'] } },
  },
} as Meta;

const Template: Story<Dialog.AuthProps> = (args) => <Dialog.Auth {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  url: 'https://git.publica.re/demo/work',
  auth: { username: 'demo', password: 'demodemo' },
};
