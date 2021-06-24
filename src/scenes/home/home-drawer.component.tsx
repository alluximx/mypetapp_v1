import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Drawer,
  DrawerElement,
  DrawerItem,
  DrawerItemElement,
  Layout,
  Icon,
  Text,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {AppInfoService} from '../../services/app-info.service';

export const HomeDrawer = ({navigation}): DrawerElement => {
  const onHomeButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const renderHeader = (): DrawerItemElement => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        {/* <Avatar
          size="giant"
          source={require('../../assets/images/image-app-icon.png')}
        /> */}
        <Text
          onPress={onHomeButtonPress}
          style={styles.profileName}
          category="h6">
          Dogit
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerItemElement => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Text style={styles.profileName} category="s2">
          v{AppInfoService.getVersion()}.{AppInfoService.getBuildNumber()}
        </Text>
      </View>
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
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Drawer header={renderHeader} footer={renderFooter}>
        <DrawerItem
          onPress={onHomeButtonPress}
          accessoryLeft={AccessIcon}
          title="Mis Mascotas"
        />
        <DrawerItem
          onPress={onAccessButtonPress}
          accessoryLeft={AccessIcon}
          title="Mi Perfil"
        />
        <DrawerItem
          onPress={onLogoutButtonPress}
          accessoryLeft={LogoutIcon}
          title="Cerrar Sesión"
        />
      </Drawer>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
