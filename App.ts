import App from './src/app/app.component';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://6a879586bd10429e9460792b135da179@o527363.ingest.sentry.io/6247263',
});

export default Sentry.wrap(App);
