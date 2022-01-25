import React, {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const DEFAULT_LOCATION = {
  latitude: 25.678300366047267,
  longitude: -100.31363678043556,
};

const useGeolocation = (initialLocation: LatLng = null) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  const handleSuccess = position => {
    const {latitude, longitude} = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = error => {
    console.warn(error);
  };

  useEffect(() => {
    const checkPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(handleSuccess, handleError);
          } else {
            setLocation(initialLocation ?? DEFAULT_LOCATION);
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        Geolocation.getCurrentPosition(handleSuccess, handleError);
      }
    };

    checkPermission();
  }, []);

  return location;
};

export default useGeolocation;
