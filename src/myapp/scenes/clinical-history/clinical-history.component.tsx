import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon} from '../../components/icons';
import ContentView from '../../layouts/clinical-history/index';
import {DrawerShowcase} from '../components/drawer/drawer-showcase.component';

export const ClinicalHistoryScreen = ({navigation}): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      accessoryRight={renderRightActions}
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderRightActions = (): React.ReactElement => (
    <React.Fragment>
      <DrawerShowcase onPress={navigation.toggleDrawer} />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Historial Clínico"
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Divider />
      <ContentView navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
