import React from 'react';
import ContentView from '../../layouts/vaccines/vaccine-index';

export const VaccineIndexScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
