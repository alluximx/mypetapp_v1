import React from 'react';
import ContentView from '../../layouts/pets/select';

export const SelectPetScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
