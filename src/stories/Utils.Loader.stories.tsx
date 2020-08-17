// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Utils } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'Utils/Loader',
  component: (Utils.Loader as unknown) as React.FC<Utils.LoaderProps>,
  argTypes: {
    message: { control: 'text' },
  },
} as Meta;

const Template: Story<Utils.LoaderProps> = (args) => <Utils.Loader {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  message: 'some loading message',
};
