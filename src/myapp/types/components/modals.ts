import {ImageURISource} from 'react-native';
import {VariantOption} from '../models';

export interface PreviewableImageProps {
  source: ImageURISource;
  style?: {};
}

export interface PreviewableImageListProps {
  sources: ImageURISource[];
  style?: {};
  containerStyle?: {};
}

export interface EditProductModalProps {
  onAccept: () => void;
  onCancel: () => void;
  presentationId: string;
  quantity: number;
  variantsList: VariantOption[];
  visible: boolean;
}
