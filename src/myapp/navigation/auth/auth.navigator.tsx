import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { StyleSheet } from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// AUTH SCREENS
import { SignInScreen } from '../../scenes/auth/sign-in.component';
import { SignUpScreen } from '../../scenes/auth/sign-up.component';
import { ForgotPasswordScreen } from '../../scenes/auth/forgot-password.component';
import { RecoveryKeyScreen } from '../../scenes/auth/recovery-key.component';
import { StartScreen } from '../../scenes/start/start.component';
import { TermsScreen } from '../../scenes/auth/terms.component';
// My Components
import CloseButton from '../../components/buttons/close-button';
import BackButton from '../../components/buttons/back-button';
// Types
import AuthStackParamList from '../../types/navigation/auth-stack';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = ({ navigation }): React.ReactElement => {
  const closeButton = () => <CloseButton navigation={navigation} />;
  const backButton = () => <BackButton navigation={navigation} />;

  return (
    <AuthStack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerLeft: backButton,
        headerHideShadow: true,
        headerStyle: styles.header,
        headerTopInsetEnabled: false,
        stackAnimation: 'slide_from_right',
        headerTitle: null,
      }}>
      {/* AUTH */}
      <AuthStack.Screen
        name="Start"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerLeft: closeButton,
          stackAnimation: 'flip',
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerLeft: closeButton,
          stackAnimation: 'flip',
        }}
      />
      <AuthStack.Screen name="Terms" component={TermsScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        initialParams={{
          isSettingPassword: false,
          userId: null,
        }}
      />
      <AuthStack.Screen name="RecoveryKey" component={RecoveryKeyScreen} />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.backgroundDefault,
  },
});
