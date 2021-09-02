import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
// Global Styles.
import globalColors from '../myapp/styles/colors';
// My Components
import BackButton from '../myapp/components/buttons/back-button';
// Navigators.
import {AuthNavigator} from '../myapp/navigation/auth/auth.navigator';
import {HomeNavigator} from './home.navigator';
// Context
import {AuthContext, AuthContextType} from '../myapp/context/AuthContext';
// Services
import AuthService from '../myapp/services/auth-service';
// Reducer
import {reducer, initialState} from '../../src/reducer';
import RootStackParamList from '../myapp/types/navigation/root-stack';
// Native screens.
import {enableScreens} from 'react-native-screens';
import CustomSpinner from '../myapp/components/custom-spinner';
enableScreens(true);

const RootStack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export const MyAppNavigator = (): React.ReactElement => {
  const navigationRef = useRef<NavigationContainerRef>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      setLoading(true);
      let userToken: string;

      try {
        userToken = await AsyncStorage.getItem('auth_token');
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      } catch (e) {
        // Restoring token failed
      }

      setLoading(false);
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    (): AuthContextType => ({
      isGuest: state.userToken == null ? true : false,
      goHomeAsGuest: () => {
        dispatch({type: 'GUEST_SIGN_IN'});
      },
      signIn: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          dispatch({type: 'SIGN_IN', token: response.data.token});
          return {status: true, data: response.data};
        } catch (error) {
          return {status: false, data: error.response.data};
        }
      },
      signUp: async (data) => {
        try {
          const response = await AuthService.PostSignup(data);
          return {status: true, data: response.data};
        } catch (error) {
          return {status: false, data: error.response.data};
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('auth_token');
        queryClient.clear();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [state.userToken],
  );

  const backButton = () => <BackButton navigation={navigationRef} />;

  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContext}>
          <RootStack.Navigator
            initialRouteName="AuthNavigator"
            screenOptions={{
              headerLeft: backButton,
              headerHideShadow: true,
              headerStyle: styles.header,
              headerTopInsetEnabled: false,
              stackAnimation: 'fade',
              contentStyle: {backgroundColor: globalColors.backgroundDefault},
            }}>
            {loading ? (
              <RootStack.Screen
                name="Loading"
                component={() => <CustomSpinner />}
                options={{
                  headerShown: false,
                }}
              />
            ) : state.userToken || state.isGuest ? (
              <RootStack.Screen
                name="HomeNavigator"
                component={HomeNavigator}
                options={{
                  headerShown: false,
                  stackAnimation: 'fade',
                }}
                initialParams={{
                  isGuest: state.isGuest,
                }}
              />
            ) : (
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                initialParams={{
                  isGuest: state.isGuest,
                }}
                options={{
                  headerShown: false,
                }}
              />
            )}
          </RootStack.Navigator>
        </AuthContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.backgroundDefault,
  },
});
