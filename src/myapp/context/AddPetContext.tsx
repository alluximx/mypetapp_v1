import React from 'react';
import {ImageSourcePropType} from 'react-native';

export interface AddPetFormParams {
  image: ImageSourcePropType;
  name: string;
  breed: string;
  owner_user: number;
  sex: string | number;
  size: string;
  birthday: string | Date;
}

export interface AddPetContextType {
  form: AddPetFormParams;
  setForm: (form: AddPetFormParams) => void;
}

// Default function definitions.
export const AddPetContext = React.createContext<AddPetContextType>({
  form: {
    image: null,
    name: '',
    breed: '',
    owner_user: -1,
    sex: '',
    size: '',
    birthday: '',
  },
  setForm: (form) => {},
});
