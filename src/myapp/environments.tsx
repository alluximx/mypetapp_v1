import {
  BASE_URL_DEV,
  API_URL_DEV,
  BASE_URL_PROD,
  API_URL_PROD,
  GUEST_USER_DEV,
  GUEST_PASS_DEV,
  GUEST_USER_PROD,
  GUEST_PASS_PROD,
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
    GUEST_USER: GUEST_USER_PROD,
    GUEST_PASS: GUEST_PASS_PROD,
  },
  development: {
    BASE_URL: BASE_URL_DEV,
    API_URL: API_URL_DEV,
    GUEST_USER: GUEST_USER_DEV,
    GUEST_PASS: GUEST_PASS_DEV,
  },
};

const env = new Environments();
export default env.getEnvironment();
