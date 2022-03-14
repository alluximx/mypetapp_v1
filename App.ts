import App from './src/app/app.component';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://2544b1c2d47e4e538e6c9317e4265228@o527363.ingest.sentry.io/6251090',
});

export default Sentry.wrap(App);
