import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {FocusAwareStatusBarProps} from '../types/components/layouts';

const FocusAwareStatusBar = (props: FocusAwareStatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
};

export default FocusAwareStatusBar;
