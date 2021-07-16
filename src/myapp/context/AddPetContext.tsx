import React from 'react';

interface AddPetFormParams {
  image: string;
  name: string;
  breed: string;
  owner_user: number;
  sex: string;
  size: string;
  birthday: string;
}

export interface AddPetContextType {
  form: AddPetFormParams;
  setForm: (form: AddPetFormParams) => void;
}

// Default function definitions.
export const AddPetContext = React.createContext<AddPetContextType>({
  form: {
    image: '',
    name: '',
    breed: '',
    owner_user: -1,
    sex: '',
    size: '',
    birthday: '',
  },
  setForm: (form) => {},
});
