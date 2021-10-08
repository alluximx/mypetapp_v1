import React, {useState} from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {Dimensions, Image, Platform, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
// Env
import environments from '../../../environments';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import CustomMarker from '../../../components/maps/custom-marker';
import GenericCard from '../../../components/cards/generic-card';
import RatingCard from '../../../components/cards/rating-card';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [currentVet, setCurrentVet] = useState(null);
  const stateName = route.params.filter.stateName;
  const townName = route.params.filter.townName;
  const data = route.params.data;

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

  const renderVetCard = (vet) => {
    const name = vet.name;
    const address = vet.address;
    const rating = vet.rating;
    const distance = vet.distance;
    const image = vet.image;
    return (
      <GenericCard
        contentTextStyle={styles.subtitleCard}
        coverImageStyle={styles.coverImage}
        styleCard={{
          marginHorizontal: globalVars.outsidePadding,
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 20,
          width: width - globalVars.outsidePadding * 2,
        }}
        data={{
          additionalContent: [
            <RatingCard
              rating={rating}
              distance={distance}
              styleCard={{marginTop: 8}}
            />,
          ],
          content: address,
          coverImage: image,
          title: name,
        }}
        onClick={() => {
          navigation.navigate('VetDetail', {data: vet});
        }}
      />
    );
  };

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
      <View style={styles.container}>
        {currentVet && renderVetCard(currentVet)}
        <MapView
          initialRegion={{
            latitude: 25.618644,
            longitude: -100.276509,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          provider="google" // remove if not using Google Maps
          style={styles.map}>
          {data.map((vet, index) => (
            <CustomMarker
              coordinate={{
                latitude: 25.618644 + index / 800,
                longitude: -100.276509 + index / 800,
              }}
              isActive={currentVet?.distance === vet.distance}
              onPress={() => setCurrentVet(vet)}
            />
          ))}
        </MapView>
      </View>
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
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
    paddingBottom: 0,
  },
  locationImage: {
    height: 40,
    width: 40,
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
});
