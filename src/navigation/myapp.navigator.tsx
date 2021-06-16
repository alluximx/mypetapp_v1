import React, {useEffect, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
// AUTH SCREENS
import {SignInScreen} from '../myapp/auth/sign-in.component';
import {SignUpScreen} from '../myapp/scenes/auth/sign-up.component';
import {ForgotPasswordScreen} from '../myapp/scenes/auth/forgot-password.component';
import {RecoveryKeyScreen} from '../myapp/scenes/auth/recovery-key.component';
import {StartScreen} from '../myapp/scenes/start/start.component';
import {TermsScreen} from '../myapp/scenes/terms/terms.component';
import {HomeScreen} from '../myapp/scenes/home/home.component';
import {reducer, initialState} from '../../src/reducer';
import AuthService from '../myapp/services/auth-service';
import {QueryClient} from 'react-query';
import {AuthContext} from '../myapp/context/AuthContext';
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
          // console.log(error);
          return false;
        }
      },
      personalData: async (data) => {
        try {
          const response = await AuthService.PostLogin(data);
          await AsyncStorage.setItem('auth_token', response.data.token);
          return true;
        } catch (e) {
          // console.log(e);
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
          // console.log('Err', error.response.data);
          return {status: false, data: error.response.data};
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="RecoveryKey" component={RecoveryKeyScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="AddVaccine" component={AddVaccineScreen} />
        <Stack.Screen name="AddVisit" component={AddVisitScreen} />
        <Stack.Screen name="AddDeworming" component={AddDewormingScreen} />
        <Stack.Screen name="DetailPet" component={DetailPetScreen} />
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
