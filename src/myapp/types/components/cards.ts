import {ImageURISource} from 'react-native';

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
    buttonColor?: string;
    buttonClick?: (data?: any) => void;
    content: string;
    coverImage?: string;
    date?: Date | null;
    images?: {file: string}[];
    title: string;
  };
  isDisabled?: boolean;
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
