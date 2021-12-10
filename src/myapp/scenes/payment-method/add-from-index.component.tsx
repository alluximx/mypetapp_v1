import React from 'react';
import ContentView from '../../layouts/payment-method/add-from-index/index';

export const AddPaymentMethodFromIndexScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
