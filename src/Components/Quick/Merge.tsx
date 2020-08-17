// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import * as Intl from 'react-i18next';
import * as UI from '@fluentui/react';
import bind from 'bind-decorator';

import Git, {
  MergeConflictSolution,
  GitComponentState,
} from '@publica.re/react-git-provider';
import '../../theme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Widget } from '..';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MergeConflict from '../View/MergeConflict';

export interface MergeProps {
  alert: (title: string, canChoose?: boolean) => Promise<boolean>;
}

export interface MergeState {
  message: string;
  left?: string;
  right?: string;
  mergeConflicts?: MergeConflictSolution[];
  mergeConflictsSolved?: boolean;
}

const theme = UI.getTheme();
const iconButtonClass = UI.mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
  },
]);

class Merge extends Git.Component<
  MergeProps & Intl.WithTranslation,
  MergeState
> {
  constructor(props: MergeProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      ...this.state,
      message: '',
      mergeConflicts: undefined,
      mergeConflictsSolved: undefined,
      gitWatch: {
        branch: {
          current: {},
          list: {},
        },
      },
    };
  }

  componentDidMount(): void {
    super.componentDidMount();
    this.updateBranches();
  }

  componentDidUpdate(
    prevProps: MergeProps,
    prevState: MergeState & GitComponentState,
  ): void {
    super.componentDidUpdate(prevProps, prevState);
    if (
      prevState.gitValues.branch?.current !==
      this.state.gitValues.branch?.current
    ) {
      this.updateBranches();
    }
  }

  @bind
  async updateBranches(): Promise<void> {
    const { left } = this.state;
    const { branch } = this.state.gitValues;
    if (branch?.current === undefined || branch?.list === undefined) {
      await new Promise((r) => setTimeout(r, 100));
      return await this.updateBranches();
    }
    const extension = Object.entries(branch.list).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([remote, _]) => remote !== 'local',
    );
    if (extension !== undefined) {
      const [origin, originBranches] = extension;
      const myBranch =
        originBranches.find((v) => v === branch.current) ||
        originBranches.find((v) => v === 'master') ||
        originBranches[0];
      if (!left?.startsWith('local')) {
        this.setState({
          left: `${origin}/${myBranch}`,
          right: `local/${branch.current}`,
        });
      } else {
        this.setState({
          left: `local/${branch.current}`,
          right: `${origin}/${myBranch}`,
        });
      }
    }
  }

  @bind
  async doFetch(): Promise<void> {
    const { left } = this.state;
    if (left !== undefined && !left.startsWith('local/')) {
      const { repository } = this.context.io;
      const fetchResult = await repository.fetch({});
      if (fetchResult.type === 'error') {
        this.props.alert(fetchResult.message.toString(), false);
      }
    }
  }

  @bind
  async doCreateBranch(): Promise<void> {
    const { right } = this.state;
    if (right) {
      const idRight = right.replace(/^local\//, '');
      const { branch } = this.state.gitValues;
      const { branch: branchIo } = this.context.io;
      if (
        right.startsWith('local/') &&
        branch?.list?.local !== undefined &&
        !branch.list.local.includes(idRight)
      ) {
        await branchIo.create({ ref: idRight });
      }
    }
  }

  @bind
  async doPush(): Promise<void> {
    const { t } = this.props;
    const { left, right } = this.state;
    if (left && right) {
      const idLeft = left.replace(/^local\//, '');
      if (!right.startsWith('local/')) {
        const { repository } = this.context.io;
        const [remote, remoteRef] = right.split('/');
        const pushResult = await repository.push({
          remote: remote,
          remoteRef: remoteRef,
          ref: idLeft,
        });
        if (pushResult.type === 'error') {
          if (
            pushResult.message.name === 'PushRejectedError' &&
            (await this.props.alert(t('error.merge.push-conflicts'), true))
          ) {
            const forcePushResult = await repository.push({
              remote: remote,
              remoteRef: remoteRef,
              ref: idLeft,
              force: true,
            });
            if (forcePushResult.type === 'error') {
              this.props.alert(forcePushResult.message.toString());
            }
          } else if (pushResult.message.name === 'GitPushError') {
            this.props.alert(t('error.push.not-allowed'));
          } else {
            this.props.alert(pushResult.message.toString());
          }
        }
      }
    }
  }

  @bind
  async doMerge(): Promise<void> {
    const { t } = this.props;
    const { left, right } = this.state;
    const { branch } = this.context.io;
    if (left && right) {
      const idLeft = left.replace(/^local\//, '');
      const idRight = right.replace(/^local\//, '');
      await this.doFetch();
      await this.doCreateBranch();
      const mergeResult = await branch.merge({
        from: idLeft,
        into: idRight,
      });
      if (mergeResult.type === 'success' && Array.isArray(mergeResult.value)) {
        if (await this.props.alert(t('error.merge.conflict-continue'), true)) {
          this.setState({
            mergeConflicts: mergeResult.value,
            mergeConflictsSolved: undefined,
          });
          while (this.state.mergeConflictsSolved === undefined) {
            await new Promise((r) => setTimeout(r, 100));
          }
          if (this.state.mergeConflictsSolved && this.state.mergeConflicts) {
            await branch.solveConflicts({
              mergeConflicts: this.state.mergeConflicts,
              from: idLeft,
              into: idRight,
            });
          }
          this.setState({
            mergeConflicts: undefined,
            mergeConflictsSolved: undefined,
          });
        }
      } else {
        if (
          mergeResult.type === 'success' &&
          !Array.isArray(mergeResult.value) &&
          mergeResult.value.oid
        ) {
          await branch.rebase({
            ref: idRight,
            oid: mergeResult.value.oid,
          });
        }
      }
      this.doPush();
    }
  }

  @bind
  async doRebase(): Promise<void> {
    const { left, right } = this.state;
    if (left && right) {
      await this.doFetch();
      await this.doCreateBranch();
      const idLeft = left.replace(/^local\//, '');
      const idRight = right.replace(/^local\//, '');
      const { branch } = this.context.io;
      await branch.rebase({
        oid: idLeft,
        ref: idRight,
      });
      await this.doPush();
    }
  }

  @bind
  resolveConflicts(resolvedConflicts: MergeConflictSolution[]): void {
    this.setState({
      mergeConflicts: resolvedConflicts,
      mergeConflictsSolved: true,
    });
  }

  @bind
  abortConflicts(): void {
    this.setState({
      mergeConflictsSolved: false,
    });
  }

  @bind
  setLeft(key: string): void {
    this.setState({
      left: key,
    });
  }

  @bind
  setRight(key: string): void {
    this.setState({
      right: key,
    });
  }

  @bind
  toggleLeftRight(): void {
    this.setState(({ left, right }) => ({
      left: right,
      right: left,
    }));
  }

  render(): React.ReactNode {
    const { t } = this.props;
    return (
      <UI.Stack horizontal>
        <Widget.Branch
          allowNewBranch={false}
          selection={this.state.left}
          onSelect={this.setLeft}
        />
        <UI.IconButton
          onClick={this.toggleLeftRight}
          iconProps={{
            iconName: 'DoubleChevronRight12',
          }}
          className={iconButtonClass}
        />
        <Widget.Branch
          allowNewBranch={true}
          selection={this.state.right}
          onSelect={this.setRight}
        />
        <UI.IconButton
          iconProps={{
            iconName: 'BranchPullRequest',
          }}
          title={t('action.rebase')}
          onClick={this.doRebase}
          className={iconButtonClass}
        />

        <UI.IconButton
          iconProps={{
            iconName: 'BranchMerge',
          }}
          title={t('action.merge')}
          className={iconButtonClass}
          onClick={this.doMerge}
        />
        {this.state.mergeConflicts !== undefined && (
          <MergeConflict
            mergeConflicts={this.state.mergeConflicts}
            onResolve={this.resolveConflicts}
            onAbort={this.abortConflicts}
          />
        )}
      </UI.Stack>
    );
  }
}

export default Intl.withTranslation('translation')(Merge);
