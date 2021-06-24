import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import {MyAppNavigator} from './myapp.navigator';
import {HomeDrawer} from '../myapp/components/navigation/home-drawer';
// Global Styles
import globalColors from '../myapp/styles/colors';

const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    drawerStyle={styles.drawer}
    screenOptions={{gestureEnabled: false}}
    drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name="MyApp" component={MyAppNavigator} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawer: {
    width: '100%',
  },
});
