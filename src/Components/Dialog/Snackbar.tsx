import * as React from 'react';
import * as Intl from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as UI from '@fluentui/react';
import bind from 'bind-decorator';
import { generate as shortId } from 'shortid';
import '../../theme';

export interface SnackbarProps {
  messages: string[];
  duration?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SnackbarState {
  messages: {
    key: string;
    text: string;
  }[];
}

class Snackbar extends React.Component<
  SnackbarProps & Intl.WithTranslation,
  SnackbarState
> {
  constructor(props: SnackbarProps & Intl.WithTranslation) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  @bind
  clearMessages(qty: number): void {
    this.setState(({ messages }) => ({
      messages: messages.slice(qty),
    }));
  }

  componentDidUpdate(prevProps: SnackbarProps): void {
    const { duration } = this.props;
    if (prevProps.messages.length !== this.props.messages.length) {
      const delta = this.props.messages.length - prevProps.messages.length;
      const newMessages = this.props.messages.slice(prevProps.messages.length);
      if (newMessages[0] !== this.state.messages[0]?.text) {
        this.setState(({ messages }) => ({
          messages: [
            ...newMessages.map((text) => ({
              key: shortId(),
              text: text,
            })),
            ...messages,
          ],
        }));
      }
      setTimeout(this.clearMessages, duration || 3000, delta);
    }
  }

  render(): React.ReactNode {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: '5vmin',
          right: '5vmin',
          width: '30vmin',
          zIndex: 900,
        }}
      >
        {this.state.messages.map(({ key, text }) => (
          <UI.MessageBar messageBarType={UI.MessageBarType.info} key={key}>
            {text}
          </UI.MessageBar>
        ))}
      </div>
    );
  }
}

export default Intl.withTranslation('translation')(Snackbar);
