import React from 'react';
import ContentView from '../../layouts/aesthetic/filter/index';

export const AestheticFilterScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
