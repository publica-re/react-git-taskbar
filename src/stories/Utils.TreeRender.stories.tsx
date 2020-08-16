// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';
import { Utils } from '../Components';
import { GitStatusOption } from 'react-git-provider';

export default {
  title: 'Utils/TreeRender',
  component: Utils.TreeRender,
  argTypes: {
    data: { control: 'object' },
    contextMenu: { control: 'boolean' },
    onStageFile: { action: 'onStageFile' },
    onStageDirectory: { action: 'onStageDirectory' },
    onNewFile: { action: 'onNewFile' },
    onNewDirectory: { action: 'onNewDirectory' },
    onMoveFile: { action: 'onMoveFile' },
    onMoveDirectory: { action: 'onMoveDirectory' },
    onDownloadFile: { action: 'onDownloadFile' },
    onDownloadDirectory: { action: 'onDownloadDirectory' },
    onDeleteFile: { action: 'onDeleteFile' },
    onDeleteDirectory: { action: 'onDeleteDirectory' },
    onRenameFile: { action: 'onRenameFile' },
    onRenameDirectory: { action: 'onRenameDirectory' },
    onUploadFile: { action: 'onUploadFile' },
    onDropFile: { action: 'onDropFile' },
    onDiscard: { action: 'onDiscard' },
  },
} as Meta;

const Template: Story<Utils.TreeRenderProps> = (args) => (
  <Utils.TreeRender {...args} />
);

export const Default = Template.bind({});
Default.args = {
  contextMenu: true,
  data: {
    id: '/',
    name: '/',
    children: [
      {
        id: '/ignored',
        name: 'ignored',
        details: {
          status: {
            option: GitStatusOption.Ignored,
            staged: false,
          },
        },
      },
      {
        id: '/unmodified',
        name: 'unmodified',
        details: {
          status: {
            option: GitStatusOption.UnModified,
            staged: true,
          },
        },
      },
      {
        id: '/modified',
        name: 'modified',
        details: {
          status: {
            option: GitStatusOption.Modified,
            staged: true,
          },
        },
      },
      {
        id: '/undeleted',
        name: 'undeleted',
        details: {
          status: {
            option: GitStatusOption.UnDeleted,
            staged: false,
          },
        },
      },
      {
        id: '/some',
        name: 'some',
        children: [
          {
            id: '/deleted',
            name: 'deleted',
            details: {
              status: {
                option: GitStatusOption.Deleted,
                staged: true,
              },
            },
          },
          {
            id: '/added',
            name: 'added',
            details: {
              status: {
                option: GitStatusOption.Added,
                staged: false,
              },
            },
          },
          {
            id: '/absent',
            name: 'absent',
            details: {
              status: {
                option: GitStatusOption.Absent,
                staged: true,
              },
            },
          },
          {
            id: '/undeletedmodified',
            name: 'undeletedmodified',
            details: {
              status: {
                option: GitStatusOption.UnDeletedModified,
                staged: true,
              },
            },
          },
        ],
      },
    ],
  },
};
