import {ImageURISource} from 'react-native';

export interface PreviewableImageProps {
  source: ImageURISource;
  style?: {};
}

export interface PreviewableImageListProps {
  sources: ImageURISource[];
  style?: {};
  containerStyle?: {};
}
