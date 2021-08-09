import React from 'react';
import ContentView from '../../layouts/adoption/detail/index';
export const adoptionDetailScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
export default adoptionDetailScreen;
