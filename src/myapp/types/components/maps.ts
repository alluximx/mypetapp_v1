import {LatLng} from 'react-native-maps';

export interface CustomMarkerProps {
  coordinate: LatLng;
  id: string;
  isActive: boolean;
  onPress: () => void;
}
