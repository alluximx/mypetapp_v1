import React from 'react';
import ContentView from '../../layouts/services/select/index';

export const SelectServiceScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
