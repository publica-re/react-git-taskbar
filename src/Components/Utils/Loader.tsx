import * as React from 'react';
import * as UI from '@fluentui/react';

import '../../theme';

export interface LoaderProps {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoaderState {}

const theme = UI.getTheme();
const overlayStyle: UI.IOverlayStyles = {
  root: {
    backgroundColor: theme.palette.whiteTranslucent40,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class Loader extends React.Component<LoaderProps, LoaderState> {
  render(): React.ReactNode {
    return (
      <UI.Layer>
        <UI.Overlay styles={overlayStyle}>
          <UI.Spinner
            label={this.props.message}
            size={UI.SpinnerSize.large}
            color={theme.palette.white}
          />
        </UI.Overlay>
      </UI.Layer>
    );
  }
}

export default Loader;
