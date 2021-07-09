import React from 'react';
import ContentView from '../../layouts/pets/edit';

export const EditPetScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
