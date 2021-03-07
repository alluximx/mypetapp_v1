import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerItem,
  Layout,
  Icon,
  MenuItemType,
  Text,
} from '@ui-kitten/components';
import {BookIcon, GithubIcon} from '../../components/icons';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {WebBrowserService} from '../../services/web-browser.service';
import {AppInfoService} from '../../services/app-info.service';

const DATA: MenuItemType[] = [
  {title: 'Libraries', icon: GithubIcon},
  {title: 'Documentation', icon: BookIcon},
];

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({navigation}): DrawerElement => {
  const onHomeButtonPress = (): void => {
    navigation && navigation.navigate('Home');
  };

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('Home');
        return;
      }
      case 1: {
        WebBrowserService.openBrowserAsync(
          'https://akveo.github.io/react-native-ui-kitten',
        );
        navigation.toggleDrawer();
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
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

  const renderFooter = (): DrawerHeaderElement => (
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
