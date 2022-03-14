import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth_service from './auth-service';
import axios from 'axios';
import environments from '../environments';
import messaging from '@react-native-firebase/messaging';

const api_url = environments.API_URL;

class FCMService {
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

    const token = await AsyncStorage.getItem('auth_token');
    // Store the token in the back
    const userData = await auth_service.me();
    const userEmail = userData?.data?.email;

    await axios.post(
      api_url + 'api/v1/devices/',
      {
        active: true,
        device_id: userEmail,
        name: userEmail,
        registration_id: fcmToken,
        type: Platform.OS,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token,
        },
      },
    );

    console.info('fcm-token', fcmToken);

    return fcmToken;
  };

  requestPermission = async () =>
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch((error) => {
        console.warn(`${error} permission rejected`);
      });

  checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };
}

const fcmService = new FCMService();
export default fcmService;
