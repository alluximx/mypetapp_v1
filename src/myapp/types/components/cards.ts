import {ImageURISource} from 'react-native';
import {LatLng} from 'react-native-maps';

export interface DatasGeneric {
  buttonStyle?: any;
  click?: any;
  contentTextStyle?: any;
  coverImageStyle?: any;
  data: {
    additionalButtons?: React.ReactElement[];
    additionalContent?: React.ReactElement[];
    additionalHeader?: string;
    buttonAlign?: string;
    buttonText?: string;
    buttonTextisSubmit?: boolean;
    buttonColor?: string;
    buttonClick?: (data?: any) => void;
    content: string;
    coverImage?: string;
    date?: Date | null;
    images?: {file: string}[];
    recipes?: any[];
    title: string;
  };
  isDisabled?: boolean;
  onClick: (data?: any) => void;
  styleCard?: any;
  titleStyle?: any;
  headerStyle?: any;
  wrapContent?: boolean;
  wrapTitle?: boolean;
}

export interface ImageInputCardProps {
  image: ImageURISource;
  label: string;
  filledLabel?: string;
  setImage: (image: ImageURISource) => void;
}

export interface VetCardProps {
  isVet: boolean;
  location: LatLng;
  styleCard?: any;
  vet: {
    id: string;
    logo: string;
    name: string;
    exterior_number: string;
    rating: string;
    street: string;
  };
}
