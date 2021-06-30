import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {Animated, StyleSheet} from 'react-native';
// Global Styles.
import globalColors from '../myapp/styles/colors';
// My Components
import BackButton from '../myapp/components/buttons/back-button';
import CloseButton from '../myapp/components/buttons/close-button';
// AUTH SCREENS
import {SignInScreen} from '../myapp/scenes/auth/sign-in.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {RecoveryKeyScreen} from '../myapp/scenes/auth/recovery-key.component';
// Services
import AuthService from '../myapp/services/auth-service';
// Context
import {AuthContext, AuthContextType} from '../myapp/context/AuthContext';
// Reducer
import {reducer, initialState} from '../../src/reducer';
// OTHER
import {StartScreen} from '../myapp/scenes/start/start.component';
import {TermsScreen} from '../myapp/scenes/auth/terms.component';
import {HomeScreen} from '../myapp/scenes/home/home.component';
import {QueryClient} from 'react-query';
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
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const MyAppNavigator = ({navigation}): React.ReactElement => {
  const isDrawerOpen = useIsDrawerOpen();
  const translateX = useRef(new Animated.Value(0)).current;
  const [, dispatch] = useReducer(reducer, initialState);

  // Drawer's animation.
  useEffect(() => {}, [translateX]);

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
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          contentStyle: isDrawerOpen ? styles.openDrawer : {},
          headerLeft: backButton,
          headerHideShadow: true,
          headerStyle: styles.header,
          stackAnimation: 'slide_from_right',
        }}>
        {/* AUTH */}
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerLeft: closeButton,
            stackAnimation: 'flip',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerLeft: closeButton,
            stackAnimation: 'flip',
          }}
        />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="RecoveryKey" component={RecoveryKeyScreen} />
        {/* HOME */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            stackAnimation: 'flip',
          }}
        />
        {/* PETS */}
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="DetailPet" component={DetailPetScreen} />
        <Stack.Screen name="AddVaccine" component={AddVaccineScreen} />
        <Stack.Screen name="AddVisit" component={AddVisitScreen} />
        <Stack.Screen name="AddDeworming" component={AddDewormingScreen} />
        <Stack.Screen
          name="ClinicalHistory"
          component={ClinicalHistoryScreen}
        />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </AuthContext.Provider>
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
