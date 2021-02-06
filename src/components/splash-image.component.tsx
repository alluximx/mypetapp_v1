import React from 'react';
import { ImageProps, NativeModules } from 'react-native';

export interface LoadingAnimationProps extends ImageProps {
  loading: boolean;
}

export const SplashImage = (props: LoadingAnimationProps): React.ReactElement | undefined => {

  if (!props.loading) {}

  return null;
};
