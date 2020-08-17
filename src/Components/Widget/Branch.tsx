import * as React from 'react';
import * as Intl from 'react-i18next';
import * as UI from '@fluentui/react';
import bind from 'bind-decorator';

import Git, { BranchList } from '@publica.re/react-git-provider';

import '../../theme';

export interface BranchProps {
  filter?: 'remote' | 'local';
  selection?: string;
  onSelect?: (option: string) => void;
  allowNewBranch?: boolean;
}

export interface BranchState {
  currentSelection: string;
}

class Branch extends Git.Component<
  BranchProps & Intl.WithTranslation,
  BranchState
> {
  constructor(props: BranchProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      ...this.state,
      currentSelection: '',
      gitWatch: {
        branch: {
          list: {},
        },
      },
    };
  }

  @bind
  getBranches(): BranchList {
    const { filter } = this.props;
    const { branch } = this.state.gitValues;
    const branchList = branch?.list;
    if (branchList === undefined) return {};
    if (filter === 'remote') {
      return Object.keys(branchList)
        .filter((key: string) => key !== 'local')
        .reduce((obj, key) => ({ ...obj, [key]: branchList[key] }), {});
    } else if (filter === 'local') {
      return Object.keys(branchList)
        .filter((key: string) => key === 'local')
        .reduce((obj, key) => ({ ...obj, [key]: branchList[key] }), {});
    }
    return branchList;
  }

  getPreparedBranches(): UI.ISelectableOption[] {
    const { filter } = this.props;
    const branches = this.getBranches();
    const getName = (remote: string, branch: string): string =>
      filter === 'local' ? branch : `${remote}/${branch}`;
    return Object.entries(branches).flatMap(([remote, branches]) => [
      {
        key: `refs/${remote}`,
        text: remote,
        itemType: UI.SelectableOptionMenuItemType.Header,
      },
      ...branches.map((branch) => ({
        key: getName(remote, branch),
        text: getName(remote, branch),
      })),
    ]);
  }

  render(): React.ReactNode {
    const { filter, allowNewBranch } = this.props;
    const preparedBranches = this.getPreparedBranches();
    const withSelection: UI.ISelectableOption[] =
      preparedBranches.findIndex((b) => b.key === this.props.selection) > -1
        ? preparedBranches
        : [
            ...preparedBranches,
            ...(this.props.selection !== undefined
              ? [
                  {
                    key: this.props.selection,
                    text: this.props.selection,
                  } as UI.ISelectableOption,
                ]
              : []),
          ];
    return (
      <UI.ComboBox
        allowFreeform={
          allowNewBranch !== undefined ? allowNewBranch : filter === 'local'
        }
        autoComplete={'on'}
        selectedKey={this.props.selection}
        onChange={(event, option): void => {
          const value =
            option?.key.toString() ||
            ((event.target as unknown) as { value: string }).value;
          this.props.onSelect && this.props.onSelect(value);
        }}
        options={withSelection}
      />
    );
  }
}

export default Intl.withTranslation('translation')(Branch);
