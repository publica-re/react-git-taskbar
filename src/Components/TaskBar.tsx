import * as React from 'react';
import * as UI from '@fluentui/react';
import bind from 'bind-decorator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Git, { AuthComponentProps } from '@publica.re/react-git-provider';

import '../theme';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dialog, Utils, ActionMenu } from '.';

UI.initializeIcons();

export interface TaskBarProps {
  repositoryUri: string;
  onEdit: (path: string) => void;
  author?: { name: string; email: string };
  corsProxy?: string | false;
  behaviour?: 'gitlab';
}

export interface TaskBarState {
  author?: { name: string; email: string };
  repositoryPath: string;
  messages: string[];
}

const theme = UI.getTheme();
const contentClass = UI.mergeStyles([
  {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateAreas: `'content'
'menu'`,
    gridTemplateRows: '1fr 4em',
    gridTemplateColumns: '1fr',
    backgroundColor: theme.palette.neutralLighterAlt,
  },
]);

class TaskBar extends React.Component<TaskBarProps, TaskBarState> {
  public static defaultProps = {
    corsProxy: 'https://cors.isomorphic-git.org/',
  };
  public static defaultAuthor = {
    name: '@publica.re/react-git-taskbar',
    email: 'contact@publica.re',
  };

  constructor(props: TaskBarProps) {
    super(props);
    this.state = {
      repositoryPath: `/${btoa(this.props.repositoryUri)}`,
      author: this.props.author,
      messages: [],
    };
  }

  componentDidUpdate(prevProps: TaskBarProps): void {
    if (prevProps.repositoryUri !== this.props.repositoryUri) {
      this.doSetup();
    }
  }

  @bind
  doSetup(): void {
    this.setState({
      repositoryPath: `/${btoa(this.props.repositoryUri)}`,
    });
  }

  render(): React.ReactNode {
    const AuthDialog: React.FC<AuthComponentProps> = (props) => (
      <Dialog.Auth {...props} behaviour={this.props.behaviour} />
    );
    return (
      <React.Suspense fallback={<Utils.Loader message='Initial load' />}>
        <Git.Provider
          url={this.props.repositoryUri}
          corsProxy={this.props.corsProxy}
          author={this.state.author || TaskBar.defaultAuthor}
          basepath={this.state.repositoryPath}
          loader={Utils.Loader}
          auth={{ type: 'element', value: AuthDialog }}
          onMessage={(newMessage): void =>
            this.setState(({ messages }) => ({
              messages: [...messages, newMessage],
            }))
          }
        >
          <UI.Fabric style={{ width: '100%', height: '100%' }}>
            <div className={contentClass}>
              <div style={{ gridArea: 'content' }}>{this.props.children}</div>
              <div style={{ gridArea: 'menu' }}>
                <ActionMenu
                  behaviour={this.props.behaviour}
                  onEdit={this.props.onEdit}
                />
              </div>
            </div>
          </UI.Fabric>
        </Git.Provider>
        <Dialog.Snackbar messages={this.state.messages} />
      </React.Suspense>
    );
  }
}

export default TaskBar;
