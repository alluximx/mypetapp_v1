import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
// Types
import {CustomMarkerProps} from '../../types/components/maps';

const CustomMarker = (props: CustomMarkerProps) => (
  <Marker
    coordinate={props.coordinate}
    identifier={props.id}
    key={props.id}
    onPress={props.onPress}>
    <Image
      source={
        props.type === 'Vet'
          ? props.isActive
            ? require('../assets/selected-vet-marker.png')
            : require('../assets/vet-marker.png')
          : props.isActive
          ? require('../assets/selected-salon-marker.png')
          : require('../assets/salon-marker.png')
      }
      style={styles.marker}
    />
  </Marker>
);

const styles = StyleSheet.create({
  marker: {
    height: 56,
    width: 56,
    resizeMode: 'contain',
  },
});

export default CustomMarker;
