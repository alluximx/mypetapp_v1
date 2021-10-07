import {
  MODE,
  BASE_URL_DEV,
  API_URL_DEV,
  BASE_URL_PROD,
  API_URL_PROD,
  IMAGES_HOST_DEV,
  IMAGES_HOST_PROD,
  GUEST_USER_DEV,
  GUEST_PASS_DEV,
  GUEST_USER_PROD,
  GUEST_PASS_PROD,
  MAPS_API_DEV,
  MAPS_API_PROD,
} from 'react-native-dotenv-2';

class Environments {
  getEnvironment() {
    let appMode = _Environments.development;

    if (MODE === 'prod') {
      appMode = _Environments.production;
    }

    return appMode;
  }
}

const _Environments = {
  production: {
    BASE_URL: BASE_URL_PROD,
    API_URL: API_URL_PROD,
    IMAGES_HOST: IMAGES_HOST_PROD,
    GUEST_USER: GUEST_USER_PROD,
    GUEST_PASS: GUEST_PASS_PROD,
    MAPS_KEY: MAPS_API_PROD,
  },
  development: {
    BASE_URL: BASE_URL_DEV,
    API_URL: API_URL_DEV,
    IMAGES_HOST: IMAGES_HOST_DEV,
    GUEST_USER: GUEST_USER_DEV,
    GUEST_PASS: GUEST_PASS_DEV,
    MAPS_KEY: MAPS_API_DEV,
  },
};

const env = new Environments();
export default env.getEnvironment();
