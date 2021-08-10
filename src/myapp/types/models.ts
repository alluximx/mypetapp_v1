export interface Breed {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  password?: string;
  name: string;
}

export interface Pet {
  birthday: string;
  breed: Breed;
  id: string;
  image: string;
  name: string;
  ownerUser: User;
  pet_age: {
    years: number;
    months: number;
  };
  size: Size;
}

export interface VisitImage {
  created: string;
  file: string;
  id: string;
  is_prescription: boolean;
  visit: string;
}
