import React from 'react';
import ContentView from '../../layouts/payment-method/index';

export const paymentMethodComponent = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
