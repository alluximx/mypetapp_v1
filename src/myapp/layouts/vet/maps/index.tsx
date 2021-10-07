import React, {useState} from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
// Env
import environments from '../../../environments';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [bottomPadding, setBottomPadding] = useState(10);

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <View style={styles.titleContainer}>
        <TitleHeader>3 Resultados</TitleHeader>
        <DefaultText>Ecatepec de Morelos, México</DefaultText>
      </View>
      <View style={styles.container}>
        <MapView
          showsUserLocation
          showsMyLocationButton
          paddingAdjustmentBehavior="always"
          followsUserLocation
          loadingEnabled
          showsCompass
          provider="google" // remove if not using Google Maps
          style={[styles.map, bottomPadding]}></MapView>
      </View>
    </DefaultLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  titleContainer: {
    paddingHorizontal: globalVars.outsidePadding,
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  map: {
    flex: 1,
  },
});
