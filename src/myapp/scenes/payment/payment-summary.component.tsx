import React from 'react';
import ContentView from '../../layouts/payment/summary/index';
export const PaymentSummaryScreen = ({
  navigation,
  route,
}): React.ReactElement => {
  return <ContentView navigation={navigation} route={route} />;
};
