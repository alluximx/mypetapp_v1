import React from 'react';
import ContentView from '../../layouts/adoption/my-requests/index';
export const MyRequestsScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
export default MyRequestsScreen;
