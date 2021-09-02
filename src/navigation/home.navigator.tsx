import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Dimensions, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
// Global Styles.
import globalColors from '../myapp/styles/colors';
// My Components.
import {HomeDrawer} from '../myapp/components/navigation/home-drawer';
import BackButton from '../myapp/components/buttons/back-button';
import CloseButton from '../myapp/components/buttons/close-button';
// Navigators.
import AddPetNavigator from '../myapp/navigation/pets/add.navigator';
// Screens.
import {CartScreen} from '../myapp/scenes/cart/shopping-cart.component';
import {ClinicalHistoryScreen} from '../myapp/scenes/clinical-history/clinical-history.component';
// Pets
import {DetailPetScreen} from '../myapp/scenes/pets/detail.component';
import {EditPetScreen} from '../myapp/scenes/pets/edit.component';
import {HomeScreen} from '../myapp/scenes/home/home.component';
import {OrdersScreen} from '../myapp/scenes/orders/orders.component';
import {ProductDetailScreen} from '../myapp/scenes/cart/product-detail.component';
import {ProductListScreen} from '../myapp/scenes/cart/product-list.component';
// Vaccines.
import {AddVaccineScreen} from '../myapp/scenes/vaccines/add.component';
import {EditVaccineScreen} from '../myapp/scenes/vaccines/edit.component';
// Types
import HomeNavigatorParamList from '../myapp/types/navigation/home-navigator';
// visits
import {InfVisitinScreen} from '../myapp/scenes/visits/Inf.component';
import {newVisitScreen} from '../myapp/scenes/visits/new-visit.component';
// Vaccines
import {VaccineIndexScreen} from '../myapp/scenes/vaccines/vaccine-index.component';
// Deworming
import {DewormingHistoryScreen} from '../myapp/scenes/deworming/deworming-history.component';
import {AddDewormingScreen} from '../myapp/scenes/deworming/add.component';
import {EditDewormingScreen} from '../myapp/scenes/deworming/edit.component';
// Breed
import {InfoBreedScreen} from '../myapp/scenes/breed/Inf.component';
import {DetailBreed} from '../myapp/scenes/breed/detail.component';
// Adoption
import {AdoptionScreen} from '../myapp/scenes/adoption/adoption.component';
import {ResultScreen} from '../myapp/scenes/adoption/result.component';
import {adoptionDetailScreen} from '../myapp/scenes/adoption/details.component';
import {FilterScreen} from '../myapp/scenes/adoption/filter.component';
import {RequestScreen} from '../myapp/scenes/adoption/request.component';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();
const width = Dimensions.get('window').width;

const Screens = ({navigation, route, style}) => {
  const closeButton = () => <CloseButton navigation={navigation} />;
  const backButton = () => <BackButton navigation={navigation} />;

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

        {/* PETS */}
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

        {/* Services visits */}
        <HomeStack.Screen name="ServicesDoc" component={InfVisitinScreen} />
        <HomeStack.Screen name="NewVisitMedical" component={newVisitScreen} />

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

        {/* Deworming */}
        <HomeStack.Screen
          name="DewormingHistory"
          component={DewormingHistoryScreen}
        />
        <HomeStack.Screen name="AddDeworming" component={AddDewormingScreen} />
        <HomeStack.Screen
          name="EditDeworming"
          component={EditDewormingScreen}
        />

        {/* Breed */}
        <HomeStack.Screen name="Breed" component={InfoBreedScreen} />
        <HomeStack.Screen
          name="DetailBreed"
          component={DetailBreed}
          options={{
            headerLeft: () => (
              <BackButton
                style={{
                  backgroundColor: globalColors.backgroundDefault,
                  borderRadius: 100,
                  padding: 5,
                }}
                navigation={navigation}
              />
            ),
            headerTopInsetEnabled: true,
            headerTranslucent: true,
            headerStyle: {backgroundColor: 'transparent'},
          }}
        />

        {/*Adoption */}
        <HomeStack.Screen name="AdoptionFilter" component={AdoptionScreen} />
        <HomeStack.Screen name="AdoptionResult" component={ResultScreen} />
        <HomeStack.Screen
          name="AdoptionDetail"
          component={adoptionDetailScreen}
          options={{
            headerLeft: () => (
              <BackButton
                style={{
                  backgroundColor: globalColors.backgroundDefault,
                  borderRadius: 100,
                  padding: 5,
                }}
                navigation={navigation}
              />
            ),
            headerTopInsetEnabled: true,
            headerTranslucent: true,
            headerStyle: {backgroundColor: 'transparent'},
          }}
        />
        <HomeStack.Screen name="AdoptionRequest" component={RequestScreen} />

        <HomeStack.Screen
          name="AdoptionAdvanceFilter"
          component={FilterScreen}
        />

        <HomeStack.Screen
          name="ClinicalHistory"
          component={ClinicalHistoryScreen}
        />
        <HomeStack.Screen name="Orders" component={OrdersScreen} />
        <HomeStack.Screen name="ProductList" component={ProductListScreen} />
        <HomeStack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
        />
        <HomeStack.Screen name="Cart" component={CartScreen} />
        {/*Product*/}
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
        return <HomeDrawer {...props} />;
      }}>
      <Drawer.Screen name="Screens" initialParams={route.params}>
        {(props) => <Screens {...props} style={animatedStyle} />}
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
