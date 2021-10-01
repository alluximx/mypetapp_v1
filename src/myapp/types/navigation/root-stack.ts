import {RouteProp} from '@react-navigation/native';
type RootStackParamList = {
  Loading: {};
  AuthNavigator: {
    isSignoutGuest: boolean;
  };
  HomeNavigator: {};
};
export type AuthRouteParams = RouteProp<RootStackParamList, 'AuthNavigator'>;
export default RootStackParamList;
