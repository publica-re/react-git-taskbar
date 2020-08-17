// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import * as Intl from 'react-i18next';
import bind from 'bind-decorator';

import Git from '@publica.re/react-git-provider';

import '../../theme';

import { Utils } from '..';
import { nullProps, TreeRenderProps, TreeViewData } from '../Utils/TreeRender';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChangesProps {}

export interface ChangesState {
  files: { [path: string]: FileList };
}

class Changes extends Git.Component<
  ChangesProps & Intl.WithTranslation,
  ChangesState
> {
  constructor(props: ChangesProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      ...this.state,
      files: {},
      gitWatch: {
        directory: {
          read: { path: '/' },
          status: {},
        },
      },
    };
  }

  @bind
  async onStage(path: string): Promise<void> {
    const { file } = this.context.io;
    const fileStatus = await file.status({ path });
    if (fileStatus.type === 'success' && fileStatus.value.status?.staged) {
      await file.unstage({ path });
    } else {
      await file.stage({ path });
    }
  }

  render(): React.ReactNode {
    const { directory } = this.state.gitValues;
    if (directory?.status === undefined || directory?.read === undefined)
      return null;
    const changeTreeData = Utils.functions.changeTree(
      directory.status,
      directory.read,
    );
    const props: (data: TreeViewData) => TreeRenderProps = (
      data: TreeViewData,
    ) => ({
      ...nullProps,
      data: data,
      onStageFile: this.onStage,
    });
    return (
      <React.Fragment>
        <Utils.TreeRender {...props(changeTreeData.staged)} />
        <Utils.TreeRender {...props(changeTreeData.notStaged)} />
      </React.Fragment>
    );
  }
}

export default Intl.withTranslation('translation')(Changes);
