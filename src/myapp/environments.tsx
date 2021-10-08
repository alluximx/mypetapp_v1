import {
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
} from 'react-native-dotenv-2';

class Environments {
  getEnvironment() {
    // var platform = getPlatform()
    return _Environments.development;
  }
}

const _Environments = {
  production: {
    BASE_URL: 'https://api.dogitapp.com/',
    API_URL: 'https://api.dogitapp.com/',
    IMAGES_HOST: 'https://dogit-prod.s3.amazonaws.com/media/',
    GUEST_USER: 'guest@email.com',
    GUEST_PASS: '!6n2+kX6W4UTTkGB',
  },
  development: {
    BASE_URL: 'https://api.mypetapp.xyz/',
    API_URL: 'https://api.mypetapp.xyz/',
    IMAGES_HOST: 'https://mpa-stage.s3.amazonaws.com/media/',
    GUEST_USER: 'guest@email.com',
    GUEST_PASS: '!6n2+kX6W4UTTkGB',
  },
};

const env = new Environments();
export default env.getEnvironment();
