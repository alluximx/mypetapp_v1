import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyAppNavigator} from './myapp.navigator';
import {HomeDrawer} from '../scenes/home/home-drawer.component';

const Drawer = createDrawerNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{gestureEnabled: false}}
    drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name="MyApp" component={MyAppNavigator} />
  </Drawer.Navigator>
);
