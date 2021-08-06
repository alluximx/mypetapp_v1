import {ImageSourcePropType} from 'react-native';

export interface ImageInputCardProps {
  image: ImageSourcePropType;
  label: string;
  setImage: (image: ImageSourcePropType) => void;
}
