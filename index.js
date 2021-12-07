/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging, {firebase} from '@react-native-firebase/messaging';

AppRegistry.registerComponent(appName, () => App);

messaging().registerDeviceForRemoteMessages();

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('MyPetApp', {rootTag});
}
