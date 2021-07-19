import React from 'react';
import {StyleSheet} from 'react-native';
import {Spinner} from '@ui-kitten/components';
// My Components.
import DefaultLayout from './layouts/default-layout';

const CustomSpinner = (): React.ReactElement => (
  <DefaultLayout style={styles.loadingContainer}>
    <Spinner status="success" />
  </DefaultLayout>
);

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSpinner;
