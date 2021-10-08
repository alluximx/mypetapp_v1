import {LatLng} from 'react-native-maps';

export interface CustomMarkerProps {
  coordinate: LatLng;
  isActive: boolean;
  onPress: () => void;
}
