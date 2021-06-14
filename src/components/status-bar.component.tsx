import React from 'react';
import {
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
  ViewProps,
} from 'react-native';
import {styled, StyledComponentProps} from '@ui-kitten/components';

export type StatusBarProps = RNStatusBarProps & StyledComponentProps;

@styled('StatusBar')
class StatusBarComponent extends React.Component<StatusBarProps> {
  public render(): React.ReactElement<ViewProps> {
    const {eva, ...statusBarProps} = this.props;

    return <RNStatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />;
  }
}

export const StatusBar = StatusBarComponent;
