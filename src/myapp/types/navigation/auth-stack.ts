import {RouteProp} from '@react-navigation/native';

type AuthStackParamList {
  Start: {};
  SignIn: {};
  SignUp: {};
  Terms: {};
  ForgotPassword: {
    isSettingPassword: boolean;
    userId: number | null;
  };
  RecoveryKey: {};
}

export type ForgotPasswordRouteParams = RouteProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export default AuthStackParamList;
