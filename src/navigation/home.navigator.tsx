import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
// Global Styles.
import globalColors from '../myapp/styles/colors';
// My Components.
import {HomeDrawer} from '../myapp/components/navigation/home-drawer';
import BackButton from '../myapp/components/buttons/back-button';
import CloseButton from '../myapp/components/buttons/close-button';
// Navigators.
import AddPetNavigator from '../myapp/navigation/pets/add.navigator';
// Types
import HomeNavigatorParamList from '../myapp/types/navigation/home-navigator';
/***************
 *** Screens ***
 ***************/
// Address
import {AddAddressScreen} from '../myapp/scenes/addresses/add.component';
import {AddressInfScreen} from '../myapp/scenes/addresses/addresses.component';
// Adoption
import {AdoptionScreen} from '../myapp/scenes/adoption/adoption.component';
import {adoptionDetailScreen} from '../myapp/scenes/adoption/details.component';
import {FilterScreen} from '../myapp/scenes/adoption/filter.component';
import {RequestScreen} from '../myapp/scenes/adoption/request.component';
import {ResultScreen} from '../myapp/scenes/adoption/result.component';
import {MyRequestsScreen} from '../myapp/scenes/adoption/my-requests.component';
// Breed
import {DetailBreed} from '../myapp/scenes/breed/detail.component';
import {InfoBreedScreen} from '../myapp/scenes/breed/Inf.component';
// Cart
import {CartScreen} from '../myapp/scenes/cart/cart.component';
// Deworming
import {AddDewormingScreen} from '../myapp/scenes/deworming/add.component';
import {DewormingHistoryScreen} from '../myapp/scenes/deworming/deworming-history.component';
import {EditDewormingScreen} from '../myapp/scenes/deworming/edit.component';
// Home
import {HomeScreen} from '../myapp/scenes/home/home.component';
// Orders
import {OrdersScreen} from '../myapp/scenes/orders/orders.component';
import {OrdersDetailScreen} from '../myapp/scenes/orders/orders-detail.component';
import {PaymentSummaryScreen} from '../myapp/scenes/payment/payment-summary.component';
// Payment Method
import {AddPaymentMethodScreen} from '../myapp/scenes/payment-method/add.component';
import {paymentMethodComponent} from '../myapp/scenes/payment-method/payment-method.component';
// Pets
import {DetailPetScreen} from '../myapp/scenes/pets/detail.component';
import {EditPetScreen} from '../myapp/scenes/pets/edit.component';
// Products
import {ProductDescriptionScreen} from '../myapp/scenes/products/product-detail.component';
import {ProductFilterScreen} from '../myapp/scenes/products/product-filter.component';
import {ProductListScreen} from '../myapp/scenes/products/product-list.component';
// Profile
import {MyProfileScreen} from '../myapp/scenes/profile/profileInf.component';
// Vaccines
import {AddVaccineScreen} from '../myapp/scenes/vaccines/add.component';
import {EditVaccineScreen} from '../myapp/scenes/vaccines/edit.component';
import {VaccineIndexScreen} from '../myapp/scenes/vaccines/vaccine-index.component';
// Visits
import {InfVisitinScreen} from '../myapp/scenes/visits/Inf.component';
import {newVisitScreen} from '../myapp/scenes/visits/new-visit.component';
// Vets
import {VetResultScreen} from '../myapp/scenes/vet/vet-list.component';
import {VetFilterScreen} from '../myapp/scenes/vet/filter.component';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();
const width = Dimensions.get('window').width;

const Screens = ({navigation, route, style, setRouteName}) => {
  const closeButton = () => <CloseButton navigation={navigation} />;
  const backButton = () => <BackButton navigation={navigation} />;
  const routeNames = getFocusedRouteNameFromRoute(route) ?? 'Home';
  setRouteName(routeNames);

  return (
    <Animated.View style={[styles.stack, style]}>
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerLeft: backButton,
          headerHideShadow: true,
          headerStyle: styles.header,
          headerTopInsetEnabled: false,
          stackAnimation: 'slide_from_right',
          headerTitle: null,
        }}>
        {/*Addresses*/}
        <HomeStack.Screen
          name="AddAddress"
          component={AddAddressScreen}
          initialParams={{data: {}}}
        />
        <HomeStack.Screen name="AddressInfo" component={AddressInfScreen} />
        {/*Adoption */}
        <HomeStack.Screen name="AdoptionFilter" component={AdoptionScreen} />
        <HomeStack.Screen
          name="AdoptionDetail"
          component={adoptionDetailScreen}
          options={{
            headerLeft: () => (
              <BackButton
                style={{
                  backgroundColor: globalColors.backgroundDefault,
                  borderRadius: 100,
                  marginTop: 2,
                }}
                navigation={navigation}
              />
            ),
            headerTopInsetEnabled: true,
            headerTranslucent: true,
            headerStyle: {backgroundColor: 'transparent'},
          }}
        />
        <HomeStack.Screen
          name="AdoptionAdvanceFilter"
          component={FilterScreen}
        />
        <HomeStack.Screen name="AdoptionResult" component={ResultScreen} />
        <HomeStack.Screen name="AdoptionRequest" component={RequestScreen} />
        <HomeStack.Screen
          name="MyAdoptionRequests"
          component={MyRequestsScreen}
        />
        {/* Breed */}
        <HomeStack.Screen
          name="DetailBreed"
          component={DetailBreed}
          options={{
            headerLeft: () => (
              <BackButton
                style={{
                  backgroundColor: globalColors.backgroundDefault,
                  borderRadius: 100,
                  padding: Platform.OS === 'ios' ? 3 : 5,
                }}
                navigation={navigation}
              />
            ),
            headerTopInsetEnabled: true,
            headerTranslucent: true,
            headerStyle: {backgroundColor: 'transparent'},
          }}
        />
        <HomeStack.Screen name="Breed" component={InfoBreedScreen} />
        {/* Cart */}
        <HomeStack.Screen name="Cart" component={CartScreen} />
        {/* Deworming */}
        <HomeStack.Screen name="AddDeworming" component={AddDewormingScreen} />
        <HomeStack.Screen
          name="DewormingHistory"
          component={DewormingHistoryScreen}
        />
        <HomeStack.Screen
          name="EditDeworming"
          component={EditDewormingScreen}
        />
        {/* HOME */}
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
          initialParams={{
            isGuest: route.params.isGuest,
          }}
        />
        {/* Order */}
        <HomeStack.Screen name="Orders" component={OrdersScreen} />
        <HomeStack.Screen name="OrdersDetail" component={OrdersDetailScreen} />
        <HomeStack.Screen
          name="PaymentSummary"
          component={PaymentSummaryScreen}
        />
        {/*Payment Method */}
        <HomeStack.Screen
          name="PaymentMethod"
          component={paymentMethodComponent}
        />
        <HomeStack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethodScreen}
          initialParams={{data: {}}}
        />
        {/* Pets */}
        <HomeStack.Screen
          name="AddPet"
          component={AddPetNavigator}
          options={{
            headerLeft: closeButton,
          }}
        />
        <HomeStack.Screen
          name="DetailPet"
          component={DetailPetScreen}
          options={{
            headerStyle: {
              backgroundColor: globalColors.greenSecondary,
            },
            headerLeft: () => (
              <BackButton isWhite={true} navigation={navigation} />
            ),
          }}
        />
        <HomeStack.Screen
          name="EditPet"
          component={EditPetScreen}
          options={{
            headerLeft: closeButton,
          }}
        />
        {/* Product */}
        <HomeStack.Screen name="ProductList" component={ProductListScreen} />
        <HomeStack.Screen
          name="ProductFilter"
          component={ProductFilterScreen}
        />
        <HomeStack.Screen
          name="ProductDetail"
          component={ProductDescriptionScreen}
          options={{
            headerLeft: () => (
              <BackButton
                style={{
                  backgroundColor: globalColors.backgroundDefault,
                  borderRadius: 100,
                  marginTop: 2,
                }}
                navigation={navigation}
              />
            ),
            headerTopInsetEnabled: true,
            headerTranslucent: true,
            headerStyle: {backgroundColor: 'transparent'},
          }}
        />
        {/* Profile */}
        <HomeStack.Screen name="MyProfile" component={MyProfileScreen} />
        {/* Services visits */}
        <HomeStack.Screen
          name="NewVisitMedical"
          component={newVisitScreen}
          options={{headerLeft: closeButton}}
        />
        <HomeStack.Screen name="ServicesDoc" component={InfVisitinScreen} />
        {/* Vaccines */}
        <HomeStack.Screen name="VaccinesIndex" component={VaccineIndexScreen} />
        <HomeStack.Screen
          name="AddVaccine"
          component={AddVaccineScreen}
          options={{
            title: '',
            headerLeft: closeButton,
          }}
        />
        <HomeStack.Screen
          name="EditVaccine"
          component={EditVaccineScreen}
          options={{
            headerLeft: closeButton,
          }}
        />
        {/* Vets */}
        <HomeStack.Screen name="VetResult" component={VetResultScreen} />
        <HomeStack.Screen name="VetFilter" component={VetFilterScreen} />
      </HomeStack.Navigator>
    </Animated.View>
  );
};

export const HomeNavigator = ({route}): React.ReactElement => {
  const [progress, setProgress] = React.useState<Animated.Node<number>>(
    new Animated.Value(0),
  );
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, -width / 5],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const animatedStyle = {transform: [{scale}, {translateX}], borderRadius};
  const [routeName, setRouteName] = useState('Home');
  return (
    <Drawer.Navigator
      overlayColor="transparent"
      drawerType="slide"
      initialRouteName="Screens"
      drawerStyle={styles.drawer}
      screenOptions={{
        gestureEnabled: true,
      }}
      sceneContainerStyle={styles.background}
      drawerContent={(props) => {
        setProgress(props.progress);
        return <HomeDrawer {...props} routeName={routeName} />;
      }}>
      <Drawer.Screen name="Screens" initialParams={route.params}>
        {(props) => (
          <Screens
            {...props}
            style={animatedStyle}
            setRouteName={setRouteName}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: (4.3 * width) / 6,
  },
  stack: {
    flex: 1,
    overflow: 'hidden',
  },
  background: {
    backgroundColor: globalColors.greenPrimary,
  },
  header: {
    backgroundColor: globalColors.backgroundDefault,
  },
});
