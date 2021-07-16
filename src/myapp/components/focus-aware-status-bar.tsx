import * as React from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
interface FocusAwareStatusBarProps {
  backgroundColor: string;
  barStyle: StatusBarStyle;
  translucent?: boolean
}
const FocusAwareStatusBar = (props: FocusAwareStatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
