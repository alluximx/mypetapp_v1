import React, {useEffect, useState} from 'react';
import {Image, Platform, View} from 'react-native';
import {Button, StyleService, useStyleSheet} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks
import useGeolocation from '../../../hooks/useGeolocation';
// My Components
import CustomMarker from '../../../components/maps/custom-marker';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import TitleHeader from '../../../components/texts/title-header';
import VetCard from '../../../components/cards/vet-card';

const LOCATION_DELTA = 0.02;

export default ({navigation, route}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [currentVet, setCurrentVet] = useState(null);
  const stateName = route.params.filter.stateName;
  const townName = route.params.filter.townName;
  const data = route.params.data;

  const currentLocation = useGeolocation(data[0]?.location);
  const [region, setRegion] = useState(
    data.length ? data[0].location : currentLocation,
  );

  useEffect(() => {
    setRegion(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (currentVet) {
      setRegion(currentVet.location);
    }
  }, [currentVet]);

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
      <View style={styles.container}>
        {currentVet && <VetCard screen="VetDetail" vet={currentVet} />}
        <Button
          activeOpacity={0.8}
          accessoryRight={() => (
            <Image
              source={require('../../../assets/images/icons/current-location.png')}
              style={styles.locationButtonImage}
            />
          )}
          onPress={() => {
            const myLocation = {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            };
            setRegion(myLocation);
          }}
          style={styles.locationButton}
        />
        <MapView
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LOCATION_DELTA,
            longitudeDelta: LOCATION_DELTA,
          }}
          showsUserLocation
          showsMyLocationButton={false}
          loadingEnabled
          provider="google" // remove if not using Google Maps
          style={styles.map}>
          {data.map((vet) => (
            <CustomMarker
              coordinate={{
                latitude: vet.location.latitude,
                longitude: vet.location.longitude,
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
  locationButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 5,
    position: 'absolute',
    top: globalVars.outsidePadding,
    right: globalVars.outsidePadding,
    width: 40,
    height: 40,
    zIndex: 30,
  },
  locationButtonImage: {
    width: 40,
    height: 40,
  },
});
