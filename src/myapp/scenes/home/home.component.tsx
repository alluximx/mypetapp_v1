import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, TopNavigation} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import ContentView from '../../layouts/home/index';
import {DrawerShowcase} from '../components/drawer/drawer-showcase.component';

export const HomeScreen = ({navigation}): React.ReactElement => {
  const renderRightActions = (): React.ReactElement => (
    <DrawerShowcase onPress={navigation.toggleDrawer} />
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Inicio" accessoryLeft={renderRightActions} />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ContentView navigation={navigation} />
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
