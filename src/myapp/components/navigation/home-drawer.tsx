import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Drawer,
  DrawerElement,
  DrawerItemElement,
  Layout,
  Icon,
  Text,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../safe-area-layout.component';
import {AppInfoService} from '../../../services/app-info.service';
// My Components
import DrawerItem from './drawer-item';
// Global Styles
import globalColors from '../../styles/colors';

export const HomeDrawer = ({navigation}): DrawerElement => {
  const onHomeButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const renderHeader = (): DrawerItemElement => (
    <Layout style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo-white.png')}
      />
    </Layout>
  );

  const LogoutIcon = (props) => <Icon {...props} name="power-outline" />;

  const AccessIcon = (props) => (
    <Icon {...props} name="arrow-circle-up-outline" />
  );

  const onAccessButtonPress = (): void => {
    navigation && navigation.navigate('Access');
  };

  const onLogoutButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<SafeAreaLayout style={styles.safeArea}>
       <Drawer header={renderHeader} style={styles.drawerBody}>
        <DrawerItem
          style={[styles.menuItem]}
          onPress={onHomeButtonPress}
          accessoryLeft={AccessIcon}
          title="Mis Mascotas"
        />
        <DrawerItem
          style={[styles.menuItem]}
          onPress={onAccessButtonPress}
          accessoryLeft={AccessIcon}
          title="Mi Perfil"
        />
        <DrawerItem
          style={[styles.menuItem]}
          onPress={onLogoutButtonPress}
          accessoryLeft={LogoutIcon}
          title="Cerrar Sesión"
        />
      </Drawer> 
    </SafeAreaLayout>*/}
      <View style={styles.containerView}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-white.png')}
        />
        <View style={{flexGrow: 1, marginTop: 50}}>
          {/* Menu Buttons */}
          <DrawerItem
            currentTab=""
            setCurrentTab={() => {}}
            title="hola"
            image=""
          />
        </View>
      </View>
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
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  safeArea: {
    backgroundColor: globalColors.greenPrimary,
  },
  header: {
    backgroundColor: globalColors.greenPrimary,
  },
  logo: {},
  drawerBody: {
    backgroundColor: globalColors.greenPrimary,
  },
  menuItem: {
    backgroundColor: 'transparent',
  },
});
