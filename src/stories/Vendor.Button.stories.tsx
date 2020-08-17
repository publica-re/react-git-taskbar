// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Vendor } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Vendor/Button',
  component: Vendor.Button,
  argTypes: {
    behaviour: { control: { type: 'radio', options: [undefined, 'gitlab'] } },
  },
} as Meta;

const Template: Story<Vendor.ButtonProps> = (args) => (
  <Vendor.Button {...args} />
);

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  behaviour: 'gitlab',
};
