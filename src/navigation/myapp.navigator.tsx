import React, {useEffect, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {MyAppScreen} from '../myapp/app/myapp.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {SignInScreen} from '../myapp/auth/sign-in.component';
import {HomeScreen} from '../myapp/scenes/home/home.component';
import {reducer, initialState} from '../../src/reducer';
import AuthService from '../myapp/services/auth-service';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthContext} from '../myapp/context/AuthContext';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export const MyAppNavigator = (): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('auth_token');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          dispatch({type: 'SIGN_IN', token: response.data.token});
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      personalData: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          return true;
        } catch (e) {
          console.log(e);
        }
      },
      // To switch from Register screens to User screens
      goHome: async () => {
        const token = await AsyncStorage.getItem('auth_token');
        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: async () => {
        await AsyncStorage.removeItem('auth_token');
        await queryClient.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data) => {
        try {
          const response = await AuthService.PostSignup(data);
          return {status: true, data: response.data};
        } catch (error) {
          console.log('Err', error.response.data);
          return {status: false, data: error.response.data};
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MyApp" component={MyAppScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};
