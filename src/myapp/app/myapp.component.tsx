import React from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon} from '../../components/icons';
import {StartScreen} from '../scenes/start/start.component';

export const MyAppScreen = ({navigation}): React.ReactElement => {
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <StartScreen navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
