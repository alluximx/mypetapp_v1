import React from 'react';
import ContentView from '../../layouts/payment-method/add/index';

export const AddPaymentMethodScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
