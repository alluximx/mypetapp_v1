import {Button} from '@ui-kitten/components';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Hooks
import useGeolocation from '../../hooks/useGeolocation';
// My Components
import CustomMarker from './custom-marker';
import VetCard from '../cards/vet-card';
// Types
import {ServiceMapProps} from '../../types/components/maps';

const LOCATION_DELTA = 0.025;

const ServiceMap = (props: ServiceMapProps) => {
  const currentLocation = useGeolocation(props.data[0]?.location);

  const [currentVet, setCurrentVet] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapView>();

  useEffect(() => {
    mapRef.current.fitToElements({
      animated: true,
      edgePadding: {
        bottom: 50,
        left: 50,
        right: 50,
        top: 300,
      },
    });
  }, [props.data, mapLoaded]);

  const onLocationButtonPress = () => {
    const myLocation = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    };
    mapRef.current.animateToRegion(
      {
        ...myLocation,
        latitudeDelta: LOCATION_DELTA,
        longitudeDelta: LOCATION_DELTA,
      },
      700,
    );
  };

  return (
    <View style={styles.container}>
      {currentVet && (
        <VetCard
          isVet={true}
          location={currentLocation}
          styleCard={styles.styleCard}
          vet={currentVet}
        />
      )}
      <Button
        activeOpacity={0.8}
        accessoryRight={() => (
          <Image
            source={require('../../../assets/images/icons/current-location.png')}
            style={styles.locationButtonImage}
          />
        )}
        onPress={onLocationButtonPress}
        style={styles.locationButton}
      />
      <MapView
        initialRegion={{
          latitude: props.data[0].location.latitude,
          longitude: props.data[0].location.longitude,
          latitudeDelta: LOCATION_DELTA,
          longitudeDelta: LOCATION_DELTA,
        }}
        loadingEnabled
        moveOnMarkerPress
        onMapLoaded={() => setMapLoaded(true)}
        provider="google" // remove if not using Google Maps
        ref={mapRef}
        showsUserLocation
        showsMyLocationButton={false}
        style={styles.map}>
        {props.data.map((vet) => (
          <CustomMarker
            coordinate={{
              latitude: vet.location.latitude,
              longitude: vet.location.longitude,
            }}
            id={vet.id}
            isActive={currentVet?.id === vet.id}
            onPress={() => setCurrentVet(vet)}
            type={props.type}
          />
        ))}
      </MapView>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  map: {
    flex: 1,
  },
  styleCard: {
    marginHorizontal: globalVars.outsidePadding,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 20,
    width: width - globalVars.outsidePadding * 2,
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

export default ServiceMap;
