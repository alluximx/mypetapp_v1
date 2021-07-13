import React from 'react';
import ContentView from '../../layouts/visits/inf/index';

export const InfVisitinScreen = ({ navigation, route }): React.ReactElement => {
  return (
      <ContentView navigation={navigation} route={route}/>
  );
};