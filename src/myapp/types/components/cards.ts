import {ImageURISource} from 'react-native';

export interface ImageInputCardProps {
  image: ImageURISource;
  label: string;
  filledLabel?: string;
  setImage: (image: ImageURISource) => void;
}
