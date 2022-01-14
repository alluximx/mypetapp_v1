import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import CustomSpinner from '../myapp/components/custom-spinner';
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
import useDeepLinks from '../myapp/hooks/fcm/useDeepLinks';
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
      let typeUser: boolean;
      let stringTypeUser: string;

      try {
        userToken = await AsyncStorage.getItem('auth_token');
        dispatch({type: 'RESTORE_TOKEN', token: userToken});

        stringTypeUser = await AsyncStorage.getItem('is_guest');
        stringTypeUser === 'true' ? (typeUser = true) : (typeUser = false);
        dispatch({type: 'RESTORE_IS_GUEST', isGuest: typeUser});
      } catch (e) {
        // Restoring token failed
      }

      setLoading(false);
    };
    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    (): AuthContextType => ({
      isGuest: state.isGuest,
      userId: state.userId,
      goHomeAsGuest: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          await AsyncStorage.setItem('is_guest', JSON.stringify(true));
          dispatch({type: 'GUEST_SIGN_IN', token: response.data.token});
          return {status: true, data: response.data};
        } catch (error) {
          return {status: false, data: error.response.data};
        }
      },
      setUserId: (userId) => {
        dispatch({type: 'SET_USER_ID', userId});
      },
      signIn: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          await AsyncStorage.setItem('is_guest', JSON.stringify(false));
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
        await AsyncStorage.removeItem('is_guest');
        queryClient.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signOutGuest: async () => {
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('is_guest');
        queryClient.clear();
        dispatch({type: 'SIGN_OUT_GUEST'});
      },
    }),
    [state.userToken, state.userId, state.isGuest],
  );

  const backButton = () => <BackButton navigation={navigationRef} />;
  const screenConfig = {
    // Deep link configuration
    screens: {
      HomeNavigator: {
        screens: {
          Screens: {
            initialRouteName: 'profile',
            screens: {
              MyProfile: 'profile',
              Orders: 'orders',
              OrdersDetail: 'orders/:id',
              DetailPet: 'pets/:id',
              EditVaccine: 'pets/:petId/vaccines/:vaccineId',
              EditDeworming: 'pets/:petId/dewormings/:vaccineId',
            },
          },
        },
      },
    },
  };
  const prefixes = ['dogit://', 'https://dogit/'];
  const [linking, initialRoute] = useDeepLinks(prefixes, screenConfig);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContext}>
          <RootStack.Navigator
            initialRouteName="AuthNavigator"
            screenOptions={{
              headerLeft: backButton,
              headerHideShadow: true,
              headerStyle: styles.header,
              headerTopInsetEnabled: false,
              stackAnimation: 'slide_from_right',
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
                  stackAnimation: 'slide_from_right',
                }}
                initialParams={{
                  isGuest: false,
                  initialRoute: initialRoute,
                }}
              />
            ) : (
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                initialParams={{
                  isSignoutGuest: state.isSignoutGuest,
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
