import React from 'react';

interface AddPetFormParams {
  image: string;
  name: string;
  breedId: number;
  userId: number;
  sex: string;
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
    breedId: -1,
    userId: -1,
    sex: '',
    birthday: '',
  },
  setForm: (form) => {},
});
