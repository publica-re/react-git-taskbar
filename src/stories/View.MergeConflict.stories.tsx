// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { View } from '../Components';
import { decorators } from './decorators';

export default {
  title: 'View/MergeConflict',
  component: View.MergeConflict,
  argTypes: {
    mergeConflicts: { control: 'object' },
    onResolve: { action: 'resolve' },
    onAbort: { action: 'abort' },
  },
} as Meta;

const Template: Story<View.MergeConflictProps> = (args) => (
  <View.MergeConflict {...args} />
);

export const Default = Template.bind({});
Default.decorators = decorators;
Default.args = {
  mergeConflicts: [
    {
      file: '/hello',
      type: 'patch',
      content: `2c2
< world
---
>  world`,
    },
    {
      file: '/accept',
      type: 'patch',
      content: `1c1
< accepted
---
> accept3d`,
      accept: true,
    },
    {
      file: '/bin',
      type: 'binary',
      left: Uint8Array.from([0, 13, 14]),
      right: Uint8Array.from([0, 13, 12]),
    },
  ],
};
