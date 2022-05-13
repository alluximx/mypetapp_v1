import axios from 'axios';
import ReactNativeBlobUtil from 'react-native-blob-util';
import enviroments from '../environments';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AppServices {
  get = async (url: string, authorization: boolean = false) => {
    const token = await AsyncStorage.getItem('auth_token');
    return axios.get(api_url + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization ? 'Token ' + token : '',
      },
    });
  };

  search = async (url: string, term: string) => {
    const token = await AsyncStorage.getItem('auth_token');
    return axios.get(api_url + url + '?search=' + term, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    });
  };

  delete = async (url: string, id: number | string) => {
    const token = await AsyncStorage.getItem('auth_token');
    const full_url = api_url + url + id + '/';
    return axios.delete(full_url, {
      headers: {
        Authorization: 'Token ' + token,
      },
    });
  };

  post = async (
    url: string,
    data: {},
    authorization = false,
    hasFiles = false,
  ) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (!hasFiles) {
      return axios.post(api_url + url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization ? 'Token ' + token : '',
        },
      });
    } else {
      return ReactNativeBlobUtil.fetch(
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

  put = async (
    url: string,
    data: {},
    authorization = false,
    hasFiles = false,
  ) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (!hasFiles) {
      return axios.put(api_url + url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization ? 'Token ' + token : '',
        },
      });
    } else {
      return ReactNativeBlobUtil.fetch(
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

  download = async (url: string) => {
    const {dirs} = ReactNativeBlobUtil.fs;
    return ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        title: 'document.pdf',
        notification: true,
        mediaScannable: true,
        mime: 'application/pdf',
        description: 'Descargando documento.',
        path: dirs.DownloadDir + '/document.pdf',
      },
    }).fetch('GET', url);
  };
}

const api_url = enviroments.API_URL;
const api = new AppServices();
export default api;
