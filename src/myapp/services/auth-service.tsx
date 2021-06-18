import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import enviroments from '../environments';

class AuthService {
  PostLogin = async (data) => {
    const request = await axios.post(BASE_URL + 'auth-token/', data, {
      headers: {'Content-Type': 'application/json'},
    });
    return request;
  };

  PostSignup = async (data) => {
    const request = await axios.post(
      API_URL + 'dj-rest-auth/registration/',
      data,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    return request;
  };

  me = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const request = await axios.get(API_URL + 'users/me/', {
        headers: {Authorization: 'Token ' + token},
      });
      return request;
    } catch (error) {
      return {status: false, data: error.response.data};
    }
  };
}
const API_URL = enviroments.API_URL;
const BASE_URL = enviroments.BASE_URL;
const auth_service = new AuthService();
export default auth_service;
