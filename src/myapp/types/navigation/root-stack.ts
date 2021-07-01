import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Start: {};
  SignIn: {};
  SignUp: {};
  Terms: {};
  ForgotPassword: {
    isSettingPassword: boolean;
    userId: number | null;
  };
  RecoveryKey: {};
  Home: {
    isGuest: boolean;
  };
  AddPet: {};
  AddDeworming;
  DetailPet: {};
  AddVaccine: {};
  AddVisit: {};
  ClinicalHistory: {};
  Orders: {};
  ProductList: {};
  ProductDetail: {};
  Cart: {};
};

export type ForgotPasswordRouteParams = RouteProp<
  RootStackParamList,
  'ForgotPassword'
>;
export type HomeRouteParams = RouteProp<RootStackParamList, 'Home'>;

export default RootStackParamList;
