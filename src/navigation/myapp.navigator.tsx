import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {Animated, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
// Global Styles.
import globalColors from '../myapp/styles/colors';
// My Components
import BackButton from '../myapp/components/buttons/back-button';
import CloseButton from '../myapp/components/buttons/close-button';
// Navigators
import AddPetNavigator from '../myapp/navigation/pets/add.navigator';
// AUTH SCREENS
import {SignInScreen} from '../myapp/scenes/auth/sign-in.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {RecoveryKeyScreen} from '../myapp/scenes/auth/recovery-key.component';
// Context
import {AuthContext, AuthContextType} from '../myapp/context/AuthContext';
// Services
import AuthService from '../myapp/services/auth-service';
// Reducer
import {reducer, initialState} from '../../src/reducer';
import RootStackParamList from '../myapp/types/navigation/root-stack';

/***************
 *** SCREENS ***
 ***************/
// AUTH
import {SignInScreen} from '../myapp/auth/sign-in.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {RecoveryKeyScreen} from '../myapp/scenes/auth/recovery-key.component';

// OTHER
import {StartScreen} from '../myapp/scenes/start/start.component';
import {TermsScreen} from '../myapp/scenes/auth/terms.component';
import {HomeScreen} from '../myapp/scenes/home/home.component';
import {AddPetScreen} from '../myapp/scenes/pets/add.component';
import {DetailPetScreen} from '../myapp/scenes/pets/detail.component';
import {OrdersScreen} from '../myapp/scenes/orders/orders.component';
import {ClinicalHistoryScreen} from '../myapp/scenes/clinical-history/clinical-history.component';
import {AddDewormingScreen} from '../myapp/scenes/deworming/add.component';
import {AddVaccineScreen} from '../myapp/scenes/vaccines/add.component';
import {AddVisitScreen} from '../myapp/scenes/visits/add.component';
import {ProductListScreen} from '../myapp/scenes/cart/product-list.component';
import {ProductDetailScreen} from '../myapp/scenes/cart/product-detail.component';
import {CartScreen} from '../myapp/scenes/cart/shopping-cart.component';
// Native screens.
import {enableScreens} from 'react-native-screens';
enableScreens(true);

const RootStack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export const MyAppNavigator = ({navigation}): React.ReactElement => {
  const isDrawerOpen = useIsDrawerOpen();
  const translateX = useRef(new Animated.Value(0)).current;
  const [, dispatch] = useReducer(reducer, initialState);

  // Drawer's animation.
  useEffect(() => {}, [translateX]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string;

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
    (): AuthContextType => ({
      signIn: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          dispatch({type: 'SIGN_IN', token: response.data.token});
          return {status: true, data: response.data};
        } catch (error) {
          console.log('Err', error);
          return {status: false, data: error.response.data};
        }
      },
      signUp: async (data) => {
        try {
          const response = await AuthService.PostSignup(data);
          return {status: true, data: response.data};
        } catch (error) {
          // console.log('Err', error.response.data);
          return {status: false, data: error.response.data};
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('auth_token');
        queryClient.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      // To switch from Register screens to User screens
      goHome: async () => {
        const token = await AsyncStorage.getItem('auth_token');
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  const closeButton = () => <CloseButton navigation={navigation} />;

  const backButton = () => <BackButton navigation={navigation} />;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContext}>
        <RootStack.Navigator
          initialRouteName="Start"
          screenOptions={{
            contentStyle: isDrawerOpen ? styles.openDrawer : {},
            headerLeft: backButton,
            headerHideShadow: true,
            headerStyle: styles.header,
            stackAnimation: 'slide_from_right',
          }}>
          {/* AUTH */}
          <RootStack.Screen
            name="Start"
            component={StartScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerLeft: closeButton,
              stackAnimation: 'flip',
            }}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerLeft: closeButton,
              stackAnimation: 'flip',
            }}
          />
          <RootStack.Screen name="Terms" component={TermsScreen} />
          <RootStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            initialParams={{
              isSettingPassword: false,
              userId: null,
            }}
          />
          <RootStack.Screen name="RecoveryKey" component={RecoveryKeyScreen} />
          {/* HOME */}
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              stackAnimation: 'flip',
            }}
            initialParams={{
              isGuest: false,
            }}
          />
          {/* PETS */}
          <RootStack.Screen
            name="AddPet"
            component={AddPetNavigator}
            options={{
              headerLeft: closeButton,
              stackAnimation: 'fade',
            }}
          />
          <RootStack.Screen name="DetailPet" component={DetailPetScreen} />
          <RootStack.Screen name="AddVaccine" component={AddVaccineScreen} />
          <RootStack.Screen name="AddVisit" component={AddVisitScreen} />
          <RootStack.Screen
            name="AddDeworming"
            component={AddDewormingScreen}
          />
          <RootStack.Screen
            name="ClinicalHistory"
            component={ClinicalHistoryScreen}
          />
          <RootStack.Screen name="Orders" component={OrdersScreen} />
          <RootStack.Screen name="ProductList" component={ProductListScreen} />
          <RootStack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
          />
          <RootStack.Screen name="Cart" component={CartScreen} />
        </RootStack.Navigator>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.backgroundDefault,
  },
  openDrawer: {
    borderRadius: 20,
    overflow: 'hidden',
    transform: [
      {
        scale: 0.7,
      },
      {
        translateX: -80,
      },
    ],
  },
});
