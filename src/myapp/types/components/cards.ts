import {ImageURISource} from 'react-native';

export interface DatasGeneric {
  click?: any;
  data: {
    buttonAlign: string;
    buttonColor: string;
    buttonText: string;
    content: string;
    coverImage?: string;
    date?: Date | null;
    images?: {file: string}[];
    title: string;
  };
  onClick: (data?: any) => void;
  buttonStyle?: any;
  contentTextStyle?: any;
  titleStyle?: any;
  styleCard?: any;
}

export interface ImageInputCardProps {
  image: ImageURISource;
  label: string;
  filledLabel?: string;
  setImage: (image: ImageURISource) => void;
}
