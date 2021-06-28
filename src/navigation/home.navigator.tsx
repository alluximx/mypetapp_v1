import React from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {StyleSheet, Text} from 'react-native';
import {MyAppNavigator} from './myapp.navigator';
import {HomeDrawer} from '../myapp/components/navigation/home-drawer';
// Global Styles
import globalColors from '../myapp/styles/colors';

const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    overlayColor="transparent"
    drawerStyle={styles.drawer}
    drawerType="slide"
    screenOptions={{gestureEnabled: true}}
    drawerContent={(props) => {
      return <HomeDrawer {...props} />;
    }}>
    <Drawer.Screen name="MyApp" component={MyAppNavigator} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawer: {},
});
