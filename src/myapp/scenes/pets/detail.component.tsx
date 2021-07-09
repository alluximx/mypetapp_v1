import React from 'react';
import ContentView from '../../layouts/pets/detail';

export const DetailPetScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
