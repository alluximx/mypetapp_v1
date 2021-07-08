export interface Breed {
  id: number;
  name: string;
}

export interface Size {
  id: number;
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
  id: number;
  name: string;
  birthday: string;
  size: Size;
  breed: Breed;
  ownerUser: User;
}
