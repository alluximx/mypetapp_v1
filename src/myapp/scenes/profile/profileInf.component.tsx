import React from 'react';
import ContentView from '../../layouts/profile/index';

export const MyProfileScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
