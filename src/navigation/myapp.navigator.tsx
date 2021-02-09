import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MyAppScreen} from '../myapp/app/myapp.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {SignInScreen} from '../myapp/auth/sign-in.component';

const Stack = createStackNavigator();

export const MyAppNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='MyApp' component={MyAppScreen} />
    <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    <Stack.Screen name='SignUp' component={SignUpScreen} />
    <Stack.Screen name='SignIn' component={SignInScreen} />
  </Stack.Navigator>
);
