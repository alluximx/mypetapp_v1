import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon} from '../../components/icons';
import ContentView from '../../layouts/orders/index';
import {DrawerShowcase} from '../components/drawer/drawer-showcase.component';

export const OrdersScreen = ({navigation}): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderRightActions = (): React.ReactElement => (
    <React.Fragment>
      <DrawerShowcase onPress={navigation.toggleDrawer} />
    </React.Fragment>
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Mis Pedidos"
        leftControl={renderBackAction()}
        accessoryRight={renderRightActions}
      />
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
