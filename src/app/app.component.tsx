import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppLoading} from './app-loading.component';
import {appMappings, appThemes} from './app-theming';
import {AppIconsPack} from './app-icons-pack';
import {MyAppNavigator} from '../navigation/myapp.navigator';
import {Mapping, Theme, Theming} from '../services/theme.service';
// Screens
import {SplashScreen} from '../myapp/scenes/splash/splash.component';

import * as eva from '@eva-design/eva';
import { default as customTheme } from '../theme/custom-theme.json';

const defaultConfig: {mapping: Mapping; theme: Theme} = {
  mapping: 'eva',
  theme: 'light',
};

const App = ({mapping, theme}): React.ReactElement => {
  const [mappingContext, currentMapping] = Theming.useMapping(
    appMappings,
    mapping,
  );
  const [themeContext, currentTheme] = Theming.useTheming(
    appThemes,
    mapping,
    theme,
  );

  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...currentMapping} theme={{ ...eva.light, ...customTheme }}>
          <Theming.MappingContext.Provider value={mappingContext}>
            <Theming.ThemeContext.Provider value={themeContext}>
              <SafeAreaProvider>
                <MyAppNavigator />
              </SafeAreaProvider>
            </Theming.ThemeContext.Provider>
          </Theming.MappingContext.Provider>
        </ApplicationProvider>
      </AppearanceProvider>
    </>
  );
};

const Splash = ({loading}): React.ReactElement => {
  if (loading) {
    return <SplashScreen />;
  }
};

export default (): React.ReactElement => (
  <AppLoading initialConfig={defaultConfig} placeholder={Splash}>
    {(props) => <App {...props} />}
  </AppLoading>
);
