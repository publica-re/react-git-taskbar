import React from 'react';
import { TaskBar, View, Dialog } from 'react-git-taskbar';

export interface AppState {
  filePath: string | null;
  filePickerOpen: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      filePath: null,
      filePickerOpen: false,
    };

    this.setFilePath = this.setFilePath.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.closeFilePicker = this.closeFilePicker.bind(this);
  }

  setFilePath(newPath: string) {
    this.setState({ filePath: newPath }, this.closeFilePicker);
  }

  openFilePicker() {
    this.setState({ filePickerOpen: true });
  }

  closeFilePicker() {
    this.setState({ filePickerOpen: false });
  }

  render() {
    return (
      <TaskBar
        repositoryUri='https://github.com/git/git'
        corsProxy={'http://localhost:9415'}
        onEdit={this.setFilePath}
      >
        {this.state.filePath ? (
          <View.Editor filePath={this.state.filePath} />
        ) : (
          <div
            style={{
              display: 'flex',
              width: '100vw',
              height: '100vh',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button onClick={this.openFilePicker}>Ouvrir un fichier</button>
          </div>
        )}
        <Dialog.FilePicker
          isVisible={this.state.filePickerOpen}
          onChoose={this.setFilePath}
          onAbort={this.closeFilePicker}
        />
      </TaskBar>
    );
  }
}
