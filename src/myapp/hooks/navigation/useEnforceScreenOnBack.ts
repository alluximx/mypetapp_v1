import React, {useEffect} from 'react';
import {
  useIsFocused,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {insertBeforeLast} from '../../utils';

const useEnforceScreenOnBack = (screenName: string, params = {}) => {
  const navigation = useNavigation();
  const navigationRoutes = useNavigationState((state) => state.routes);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Check if the previous screen is the same as the desired previous screen.
    const isLastScreen =
      navigationRoutes[navigationRoutes.length - 2]?.name === screenName;

    if (isFocused && !isLastScreen) {
      navigation.dispatch(insertBeforeLast(screenName, params));
    }
  }, [isFocused, params]);
};

export default useEnforceScreenOnBack;
