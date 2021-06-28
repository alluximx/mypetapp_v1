import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {DrawerElement} from '@ui-kitten/components';
// My Components
import DrawerItem from './drawer-item';
// Global Styles
import globalColors from '../../styles/colors';
import {useState} from 'react';

export const HomeDrawer = ({navigation}): DrawerElement => {
  const [currentTab, setCurrentTab] = useState<string>('Mis Mascotas');

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
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Mi Perfil"
            image={require('../../assets/images/menu/my-profile.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Mis Mascotas"
            image={require('../../assets/images/menu/my-pets.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Próximos Servicios"
            image={require('../../assets/images/menu/coming-services.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Adopciones"
            image={require('../../assets/images/menu/adoptions.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Productos"
            image={require('../../assets/images/menu/products.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Estéticas"
            image={require('../../assets/images/menu/pet-stylists.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Veterinarias"
            image={require('../../assets/images/menu/vets.png')}
          />
          <DrawerItem
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            title="Características de Razas"
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
});
