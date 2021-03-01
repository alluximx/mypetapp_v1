import {
  BASE_URL_DEV,
  API_URL_DEV,
  BASE_URL_PROD,
  API_URL_PROD,
} from 'react-native-dotenv-2';

class Environments {
  getEnvironment() {
    // var platform = getPlatform()
    return _Environments.development;
  }
}

const _Environments = {
  production: {
    BASE_URL: BASE_URL_PROD,
    API_URL: API_URL_PROD,
  },
  development: {
    BASE_URL: BASE_URL_DEV,
    API_URL: API_URL_DEV,
  },
};

const env = new Environments();
export default env.getEnvironment();
