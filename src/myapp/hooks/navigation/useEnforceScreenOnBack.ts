import React, {useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {insertBeforeLast} from '../../utils';

const useEnforceScreenOnBack = (screenName: string) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.dispatch(insertBeforeLast(screenName));
    }
  }, [isFocused]);
};

export default useEnforceScreenOnBack;
