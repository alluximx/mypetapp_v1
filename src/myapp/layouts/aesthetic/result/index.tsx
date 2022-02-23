import React from 'react';
import {Layout, StyleService, useStyleSheet, List} from '@ui-kitten/components';
import {Dimensions, Image, Platform, TouchableOpacity} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks
import useGeolocation from '../../../hooks/useGeolocation';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VetCard from '../../../components/cards/vet-card';

export default ({navigation, route}): React.ReactElement => {
  const stateName = route.params.filter.stateName;
  const townName = route.params.filter.townName;
  const styles = useStyleSheet(themedStyles);
  const data = route.params.data;
  const currentLocation = useGeolocation(data[0]?.location);

  if (data.length > 0) {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VetMaps', {
              data,
              filter: {stateName, townName},
              type: 'Salon',
            });
          }}>
          <Image
            style={styles.locationImage}
            source={require('../../../assets/images/icons/location.png')}
          />
        </TouchableOpacity>
      ),
    });
  }

  return (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      {data.length > 0 ? (
        <>
          <TitleHeader>{data.length} Resultados</TitleHeader>
          <DefaultText>
            {townName}, {stateName}.
          </DefaultText>
          <List
            style={styles.listContainer}
            horizontal={false}
            data={data}
            renderItem={({item}) => (
              <VetCard
                isVet={false}
                key={item.id}
                location={currentLocation}
                styleCard={styles.styleCard}
                vet={item}
              />
            )}
          />
        </>
      ) : (
        <Layout style={{backgroundColor: globalColors.backgroundDefault}}>
          <Image
            style={styles.dogImage}
            source={require('../../../assets/images/pets/adoption-requests.png')}
          />
          <Layout style={styles.layoutPort}>
            <TitleHeader style={styles.title}>
              No se encontraron resultados
            </TitleHeader>
            <DefaultText style={styles.subtitle}>
              Al parecer aún no hay estéticas disponibles por tu zona.
            </DefaultText>
          </Layout>
        </Layout>
      )}
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 45,
    backgroundColor: globalColors.backgroundDefault,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 320,
    maxHeight: width,
    marginVertical: 5,
  },
  locationImage: {
    height: 40,
    width: 40,
  },
  listContainer: {
    backgroundColor: 'transparent',
    marginBottom: 15,
    marginTop: 24,
    paddingRight: globalVars.outsidePadding / 2,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  subtitleCard: {
    fontSize: 14,
    marginTop: 0,
  },
  coverImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  styleCard: {
    marginLeft: 0,
    marginRight: 0,
  },
});
