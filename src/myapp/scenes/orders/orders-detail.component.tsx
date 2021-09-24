import React from 'react';
import ContentView from '../../layouts/orders/detail/index';
export const OrdersDetailScreen = ({navigation, route}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
