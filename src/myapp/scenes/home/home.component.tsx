import React from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import ContentView from '../../layouts/home/index';
import {DrawerShowcase} from '../components/drawer/drawer-showcase.component';
// Global Styles
import globalColors from '../../../myapp/styles/colors';

export const HomeScreen = ({navigation}): React.ReactElement => {
  const renderLeftActions = (): React.ReactElement => (
    <DrawerShowcase onPress={navigation.toggleDrawer} />
  );
  return (
    <SafeAreaLayout
      appearance="default"
      backgroundColor="color-default"
      style={styles.container}
      insets="top">
      <TopNavigation
        appearance="control"
        style={{backgroundColor: globalColors.backgroundDefault}}
        accessoryLeft={renderLeftActions}
      />
      <ContentView navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
