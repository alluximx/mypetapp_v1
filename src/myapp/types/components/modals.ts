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
  id: string;
  onCancel: () => void;
  presentationId: string;
  quantity: number;
  setVisible: (value: boolean) => void;
  variantsList: VariantOption[];
  visible: boolean;
  userId: number;
}
