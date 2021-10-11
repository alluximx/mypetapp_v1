import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerElement} from '@ui-kitten/components';
// My Components
import DrawerItem from './drawer-item';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
import {useEffect} from 'react';

export const HomeDrawer = (props): DrawerElement => {
  const [currentTab, setCurrentTab] = useState<string>('Mis Mascotas');
  const list = [
    {name: 'Mis Mascotas', ruta: 'Home'},
    {name: 'Info. de Razas', ruta: 'Breed'},
    {name: 'Mi Perfil', ruta: 'MyProfile'},
    {name: 'Adopciones', ruta: 'AdoptionFilter'},
    {name: 'Productos', ruta: 'ProductList'},
    {name: 'Veterinarias', ruta: 'VetFilter'},
  ];
  useEffect(() => {
    list.map((route) => {
      route.ruta === props.routeName && setCurrentTab(route.name);
    });
  }, [props.routeName]);

  const navigateToScreen = (urlKey: string, params: {}) => {
    props.navigation.navigate(urlKey, params);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerView}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-white.png')}
        />
        <View style={styles.optionsContainer}>
          {/* Menu Buttons */}
          <DrawerItem
            urlKey="MyProfile"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Mi Perfil"
            image={require('../../assets/images/menu/my-profile.png')}
          />
          <DrawerItem
            urlKey="Home"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Mis Mascotas"
            image={require('../../assets/images/menu/my-pets.png')}
          />
          <DrawerItem
            isDisabled
            urlKey="Home"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Próximos Servicios"
            image={require('../../assets/images/menu/coming-services.png')}
          />
          <DrawerItem
            urlKey="AdoptionFilter"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Adopciones"
            image={require('../../assets/images/menu/adoptions.png')}
          />
          <DrawerItem
            urlKey="ProductList"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Productos"
            image={require('../../assets/images/menu/products.png')}
          />
          <DrawerItem
            urlKey="AestheticFilter"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Estéticas"
            image={require('../../assets/images/menu/pet-stylists.png')}
          />
          <DrawerItem
            urlKey="VetFilter"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Veterinarias"
            image={require('../../assets/images/menu/vets.png')}
          />
          <DrawerItem
            urlKey="Breed"
            params={{}}
            onPressOption={navigateToScreen}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Info. de Razas"
            image={require('../../assets/images/menu/breed-characteristics.png')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.greenPrimary,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerView: {
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logo: {
    height: 44,
    resizeMode: 'contain',
  },
  optionsContainer: {
    flexGrow: 1,
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    paddingLeft: 15,
    color: globalColors.greenSecondary,
  },
});
