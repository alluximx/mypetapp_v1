import {LatLng} from 'react-native-maps';
import {Vet} from '../models';

export interface CustomMarkerProps {
  coordinate: LatLng;
  id: string;
  isActive: boolean;
  onPress: () => void;
  type: 'Salon' | 'Vet';
}

export interface ServiceMapProps {
  data: Vet[];
  type: 'Salon' | 'Vet';
}
