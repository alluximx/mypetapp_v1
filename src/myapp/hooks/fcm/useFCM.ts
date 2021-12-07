import React from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
// Services
import fcmService from '../../services/fcm-service';
import {useNavigation} from '@react-navigation/native';

const useFCM = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('Home');

  /***************
   *** Effects ***
   ***************/

  React.useEffect(() => {
    // Register firebase on init.
    (async () => await fcmService.getToken())();

    // Define message handler when receiving notifications.
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'dog-it-default-notification-channel',
        name: 'Default Channel',
        importance: AndroidImportance.DEFAULT,
      });

      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          color: '#13b048',
          smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
          sound: 'default',
        },
        remote: true,
      });
    });

    // Define message handler when opening notification from
    // background state.
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

      navigation.navigate(remoteMessage.data.link);
    });

    // Define message handler when opening notification from
    // killed state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.link); // e.g. "Settings"
        }
      });

    return unsubscribe;
  }, []);

  return {
    loading,
    initialRoute,
  };
};

export default useFCM;
