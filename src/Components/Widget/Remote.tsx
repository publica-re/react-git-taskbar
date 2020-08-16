import * as React from 'react';
import * as Intl from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as UI from '@fluentui/react';

import Git from 'react-git-provider';

import '../../theme';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoteProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoteState {}

class Remote extends Git.Component<
  RemoteProps & Intl.WithTranslation,
  RemoteState
> {
  constructor(props: RemoteProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      ...this.state,
      gitWatch: {
        remote: {
          list: {},
        },
      },
    };
  }

  render(): React.ReactNode {
    const { remote } = this.state.gitValues;
    const { t } = this.props;
    if (remote?.list === undefined) return null;
    return (
      <UI.Stack>
        {remote.list.map(({ remote, url }: { remote: string; url: string }) => (
          <UI.Stack horizontal tokens={{ childrenGap: 15 }}>
            <UI.TextField label={t('remote.name')} defaultValue={remote} />
            <UI.TextField label={t('remote.address')} defaultValue={url} />
          </UI.Stack>
        ))}
      </UI.Stack>
    );
  }
}

export default Intl.withTranslation('translation')(Remote);
