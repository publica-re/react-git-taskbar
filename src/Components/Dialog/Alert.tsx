import * as React from 'react';
import * as Intl from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as UI from '@fluentui/react';

import Git from '@publica.re/react-git-provider';

import '../../theme';

export interface AlertProps {
  title: string;
  isVisible: boolean;
  canChoose: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AlertState {}

class Alert extends Git.Component<
  AlertProps & Intl.WithTranslation,
  AlertState
> {
  render(): React.ReactNode {
    const { title, isVisible, onClose, onConfirm, canChoose } = this.props;
    return (
      <UI.Dialog
        hidden={!isVisible}
        modalProps={{
          isBlocking: false,
        }}
        dialogContentProps={{
          title: title,
        }}
        onDismiss={onClose}
      >
        <UI.DialogFooter>
          {canChoose ? (
            <React.Fragment>
              <UI.DefaultButton onClick={onClose}>
                <Intl.Trans ns='translation' i18nKey='dialog.cancel' />
              </UI.DefaultButton>
              <UI.PrimaryButton onClick={onConfirm}>
                <Intl.Trans ns='translation' i18nKey='dialog.confirm' />
              </UI.PrimaryButton>
            </React.Fragment>
          ) : (
            <UI.PrimaryButton onClick={onConfirm}>
              <Intl.Trans ns='translation' i18nKey='dialog.confirm' />
            </UI.PrimaryButton>
          )}
        </UI.DialogFooter>
      </UI.Dialog>
    );
  }
}

export default Intl.withTranslation('translation')(Alert);
