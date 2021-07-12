import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/visits/inf/index';
import globalColors from '../../styles/colors';

export const InfVisitinScreen = ({ navigation, route }): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  return (
      <ContentView navigation={navigation} route={route}/>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault
  }
});