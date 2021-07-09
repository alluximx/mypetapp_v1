import React from 'react';
import ContentView from '../../../layouts/pets/add/name-and-picture';

export const NameAndPictureScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
