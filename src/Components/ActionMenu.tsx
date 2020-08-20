import * as React from 'react';
import * as Intl from 'react-i18next';
import * as UI from '@fluentui/react';
import bind from 'bind-decorator';

import Git, { GitInternal } from '@publica.re/react-git-provider';

import '../theme';
import * as API from '../API';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Quick, Vendor, Dialog } from '.';

export interface ActionMenuProps {
  onEdit: (path: string) => void;
  behaviour?: 'gitlab';
}

export interface ActionMenuState {
  changePanelOpen: boolean;
  fileTreeOpen: boolean;
  historyPanelOpen: boolean;
  modifiedKeyDown: boolean;
  prompt?: {
    title: string;
    defaultValue: string;
    value?: string;
  };
  alert?: {
    title: string;
    canChoose: boolean;
    result?: boolean;
  };
  pick?: {
    type: 'file' | 'dir';
    path?: string;
  };
  api?: API.Abstract;
  dimensions?: {
    top: number;
    left: number;
    boxWidth: number;
    boxHeight: number;
    windowWidth: number;
    windowHeight: number;
  };
}

const theme = UI.getTheme();
const contentClass = UI.mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    padding: '0 1em',
    alignItems: 'center',
    height: '4em',
    width: '100%',
  },
]);
const iconButtonClass = UI.mergeStyles([
  {
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
  },
]);

class ActionMenu extends Git.Component<
  ActionMenuProps & Intl.WithTranslation,
  ActionMenuState
> {
  private rootRef = React.createRef<HTMLDivElement>();
  constructor(props: ActionMenuProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      ...this.state,
      changePanelOpen: false,
      fileTreeOpen: false,
      historyPanelOpen: false,
      modifiedKeyDown: false,
      prompt: undefined,
      alert: undefined,
      pick: undefined,
    };
  }

  @bind
  async componentDidMount(): Promise<void> {
    await super.componentDidMount();
    if (this.props.behaviour !== undefined) {
      const { getAuth, url, setAuthor } = this.context.internal as GitInternal;
      const auth = await getAuth(url, {
        username: 'oauth2',
        password: 'undefined',
      });
      if (auth.password) {
        this.setState({
          api: new API.Gitlab(auth.password, url),
        });
        const author = await this.state.api?.userInfos();
        if (author !== undefined) {
          setAuthor(author);
        }
      }
    }
    document.addEventListener('keydown', (event) =>
      this.setState({ modifiedKeyDown: event.ctrlKey }),
    );
    document.addEventListener('keyup', () =>
      this.setState({ modifiedKeyDown: false }),
    );
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  @bind
  componentWillUnmount(): void {
    super.componentWillUnmount();
    window.removeEventListener('resize', this.updateDimensions);
  }

  @bind
  async doPrompt(title: string, defaultValue: string): Promise<string | false> {
    this.setState({
      prompt: { title, defaultValue, value: undefined },
    });
    while (this.state.prompt === undefined) {
      await new Promise((r) => setTimeout(r, 100));
    }
    while (
      this.state.prompt !== undefined &&
      this.state.prompt.value === undefined
    ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (this.state.prompt?.value !== undefined) {
      const value = this.state.prompt?.value;
      this.setState({ prompt: undefined });
      return value;
    } else {
      this.setState(() => ({
        prompt: undefined,
      }));
      return false;
    }
  }

  @bind
  handlePromptChange(value: string): void {
    if (this.state.prompt !== undefined) {
      this.setState({
        prompt: {
          ...this.state.prompt,
          value: value,
        },
      });
    }
  }

  @bind
  handlePromptAbort(): void {
    this.setState(() => ({
      prompt: undefined,
    }));
  }

  @bind
  async doAlert(title: string, canChoose = false): Promise<boolean> {
    this.setState({
      alert: { title, canChoose },
    });
    while (this.state.alert === undefined) {
      await new Promise((r) => setTimeout(r, 100));
    }
    while (
      this.state.alert !== undefined &&
      this.state.alert.result === undefined
    ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (this.state.alert?.result !== undefined) {
      const value = this.state.alert?.result;
      this.setState({ alert: undefined });
      return value;
    } else {
      this.setState(() => ({
        alert: undefined,
      }));
      return false;
    }
  }

  @bind
  handleAlertClose(): void {
    if (this.state.alert !== undefined) {
      this.setState({
        alert: {
          ...this.state.alert,
          result: false,
        },
      });
    }
  }

  @bind
  handleAlertConfirm(): void {
    if (this.state.alert !== undefined) {
      this.setState({
        alert: {
          ...this.state.alert,
          result: true,
        },
      });
    }
  }

  @bind
  async doPick(type: 'file' | 'dir'): Promise<string | false> {
    this.setState({
      pick: { type, path: undefined },
    });
    while (this.state.pick === undefined) {
      await new Promise((r) => setTimeout(r, 100));
    }
    while (
      this.state.pick !== undefined &&
      this.state.pick.path === undefined
    ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (this.state.pick?.path !== undefined) {
      const value = this.state.pick?.path;
      this.setState({ pick: undefined });
      return value;
    } else {
      this.setState(() => ({
        pick: undefined,
      }));
      return false;
    }
  }

  @bind
  handlePickAbort(): void {
    if (this.state.pick !== undefined) {
      this.setState({
        pick: undefined,
      });
    }
  }

  @bind
  handlePickChoose(path: string): void {
    if (this.state.pick !== undefined) {
      this.setState({
        pick: {
          ...this.state.pick,
          path: path,
        },
      });
    }
  }

  @bind
  private updateDimensions(): void {
    const { current: el } = this.rootRef;
    if (el !== null) {
      const parent = el.parentElement?.parentElement;
      if (parent) {
        this.setState({
          dimensions: {
            top: parent.offsetTop,
            left: parent.offsetLeft,
            boxWidth: parent.offsetWidth,
            boxHeight: parent.offsetHeight,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
          },
        });
      }
    }
  }

  private CustomPanel: React.FC<{
    header: string;
    openKey: 'fileTreeOpen' | 'historyPanelOpen' | 'changePanelOpen';
    type: UI.PanelType;
    width?: string;
    children?: React.ReactElement;
  }> = (props) => {
    const { dimensions } = this.state;
    return (
      <UI.Panel
        headerText={props.header}
        styles={
          dimensions !== undefined
            ? {
                root: {
                  top: dimensions.top,
                  left: dimensions.left,
                  right:
                    dimensions.windowWidth -
                    dimensions.left -
                    dimensions.boxWidth,
                  height: `calc(${dimensions.boxHeight}px - 4em)`,
                },
              }
            : {}
        }
        isHiddenOnDismiss={true}
        isOpen={this.state[props.openKey]}
        onDismiss={(): void =>
          this.setState({
            ...this.state,
            [props.openKey as
              | 'fileTreeOpen'
              | 'historyPanelOpen'
              | 'changePanelOpen']: !this.state[props.openKey],
          })
        }
        isBlocking={false}
        customWidth={props.width || '400px'}
        type={props.type}
      >
        {props.children}
      </UI.Panel>
    );
  };

  render(): React.ReactNode {
    const { t } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { CustomPanel } = this;
    return (
      <div ref={this.rootRef}>
        <UI.Stack>
          <UI.Stack
            horizontal
            className={contentClass}
            tokens={{ childrenGap: 15 }}
          >
            <UI.IconButton
              className={iconButtonClass}
              iconProps={{
                iconName: this.state.fileTreeOpen
                  ? 'FolderHorizontal'
                  : 'FolderList',
              }}
              text={t('view.tree')}
              title={t('view.tree')}
              onClick={(): void =>
                this.setState({
                  fileTreeOpen: !this.state.fileTreeOpen,
                })
              }
            />
            <UI.IconButton
              className={iconButtonClass}
              iconProps={{
                iconName: this.state.changePanelOpen
                  ? 'EntitlementPolicy'
                  : 'ChangeEntitlements',
              }}
              text={t('view.changes')}
              title={t('view.changes')}
              onClick={(): void =>
                this.setState({
                  changePanelOpen: !this.state.changePanelOpen,
                })
              }
            />
            <UI.IconButton
              className={iconButtonClass}
              iconProps={{
                iconName: this.state.historyPanelOpen
                  ? 'RemoveOccurrence'
                  : 'History',
              }}
              text={t('view.history')}
              title={t('view.history')}
              onClick={(): void =>
                this.setState({
                  historyPanelOpen: !this.state.historyPanelOpen,
                })
              }
            />
            <UI.Separator vertical />
            <UI.Text>
              <Intl.Trans ns='translation' i18nKey='title.branch' />
            </UI.Text>
            <Quick.Branch alert={this.doAlert} prompt={this.doPrompt} />
            <UI.Separator vertical />
            <UI.Text>
              <Intl.Trans ns='translation' i18nKey='title.merge' />
            </UI.Text>
            <Quick.Merge alert={this.doAlert} />
            <UI.Separator vertical />
            <UI.Text>
              <Intl.Trans ns='translation' i18nKey='title.commit' />
            </UI.Text>
            <Quick.Commit />
            <UI.Separator vertical />
            <Vendor.Button behaviour={this.props.behaviour} />
          </UI.Stack>
          <div
            style={{
              position: 'relative',
            }}
          >
            <CustomPanel
              header={t('title.changes')}
              openKey='changePanelOpen'
              type={UI.PanelType.custom}
            >
              <View.Changes />
            </CustomPanel>
            <CustomPanel
              header={t('title.tree')}
              openKey='fileTreeOpen'
              type={UI.PanelType.customNear}
            >
              <View.Tree
                prompt={this.doPrompt}
                alert={this.doAlert}
                pickFile={this.doPick}
                onEdit={this.props.onEdit}
              />
            </CustomPanel>
            <CustomPanel
              header={t('title.history')}
              openKey='historyPanelOpen'
              type={UI.PanelType.custom}
              width={'720px'}
            >
              <View.Log alert={this.doAlert} prompt={this.doPrompt} />
            </CustomPanel>
          </div>
          <Dialog.Prompt
            isVisible={this.state.prompt !== undefined}
            title={this.state.prompt?.title || ''}
            defaultValue={this.state.prompt?.defaultValue || ''}
            onApply={this.handlePromptChange}
            onAbort={this.handlePromptAbort}
          />
          <Dialog.Alert
            isVisible={this.state.alert !== undefined}
            title={this.state.alert?.title || ''}
            canChoose={this.state.alert?.canChoose || false}
            onClose={this.handleAlertClose}
            onConfirm={this.handleAlertConfirm}
          />
          <Dialog.FilePicker
            isVisible={this.state.pick !== undefined}
            pickType={this.state.pick?.type || 'file'}
            onAbort={this.handlePickAbort}
            onChoose={this.handlePickChoose}
          />
        </UI.Stack>
      </div>
    );
  }
}

export default Intl.withTranslation('translation')(ActionMenu);
