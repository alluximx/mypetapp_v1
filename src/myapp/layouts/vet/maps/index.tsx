import React from 'react';
import {Image, Platform, View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import ServiceMap from '../../../components/maps/service-map';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const stateName = route.params.filter.stateName;
  const townName = route.params.filter.townName;
  const {data, type} = route.params;

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VetResult', {
            data,
            filter: {stateName, townName},
          });
        }}>
        <Image
          style={styles.locationImage}
          source={require('../../../assets/images/icons/list.png')}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <View style={styles.titleContainer}>
        <TitleHeader>{data.length} Resultados</TitleHeader>
        <DefaultText>
          {townName}, {stateName}.
        </DefaultText>
      </View>
      <ServiceMap data={data} type={type} />
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
  locationImage: {
    height: 40,
    width: 40,
  },
});
