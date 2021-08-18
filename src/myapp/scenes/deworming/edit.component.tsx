import React from 'react';
import ContentView from '../../layouts/deworming/edit';

export const EditDewormingScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
