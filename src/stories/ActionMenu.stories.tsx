// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { ActionMenu } from '../Components';
import { ActionMenuProps } from '../Components/ActionMenu';
import { decorators } from './decorators';

export default {
  title: 'ActionMenu',
  component: ActionMenu,
  argTypes: {
    behaviour: { control: { type: 'radio', options: [undefined, 'gitlab'] } },
    onEdit: { aciton: 'edit' },
  },
} as Meta;

const Template: Story<ActionMenuProps> = (args) => <ActionMenu {...args} />;

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  behaviour: 'gitlab',
};
