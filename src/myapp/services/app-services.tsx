import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import enviroments from '../environments';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AppServices {
  get = async (url, authorization = false) => {
    let token = await AsyncStorage.getItem('auth_token');
    return axios.get(api_url + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization ? 'Token ' + token : '',
      },
    });
  };

  search = async (url, term) => {
    let token = await AsyncStorage.getItem('auth_token');
    return axios.get(api_url + url + '?search=' + term, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    });
  };

  delete = async (url, id) => {
    let token = await AsyncStorage.getItem('auth_token');
    const full_url = api_url + url + id + '/';
    return axios.delete(full_url, {
      headers: {
        Authorization: 'Token ' + token,
      },
    });
  };

  post = async (url, data, authorization = false, hasFiles = false) => {
    let token = await AsyncStorage.getItem('auth_token');
    if (!hasFiles) {
      return axios.post(api_url + url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization ? 'Token ' + token : '',
        },
      });
    } else {
      return RNFetchBlob.fetch(
        'POST',
        api_url + url,
        {
          Authorization: authorization ? 'Token ' + token : '',
          'Content-Type': 'multipart/form-data',
        },
        data,
      );
    }
  };

  put = async (url, data, authorization = false, hasFiles = false) => {
    let token = await AsyncStorage.getItem('auth_token');
    if (!hasFiles) {
      return axios.put(api_url + url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization ? 'Token ' + token : '',
        },
      });
    } else {
      return RNFetchBlob.fetch(
        'PUT',
        api_url + url,
        {
          Authorization: authorization ? 'Token ' + token : '',
          'Content-Type': 'multipart/form-data',
        },
        data,
      );
    }
  };
}

const api_url = enviroments.API_URL;
const api = new AppServices();
export default api;
