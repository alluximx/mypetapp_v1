import {ImageURISource} from 'react-native';

export interface DatasGeneric {
  buttonStyle?: any;
  click?: any;
  contentTextStyle?: any;
  coverImageStyle?: any;
  data: {
    additionalButtons?: React.ReactElement[];
    additionalContent?: React.ReactElement[];
    buttonAlign?: string;
    buttonText?: string;
    content: string;
    coverImage?: string;
    date?: Date | null;
    images?: {file: string}[];
    title: string;
  };
  onClick: (data?: any) => void;
  styleCard?: any;
  titleStyle?: any;
}

export interface ImageInputCardProps {
  image: ImageURISource;
  label: string;
  filledLabel?: string;
  setImage: (image: ImageURISource) => void;
}
