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

export interface Vaccine {
  id?: string;
  vaccine_name: string;
  is_unique: boolean;
  is_vaccine: boolean;
}

export interface VaccineHistory {
  id?: string;
  user_pet: string;
  vaccine_registered: string;
  vaccine_date: string | Date;
  next_vaccine_date: string | Date;
  reminder: string | Date;
  is_vaccine: boolean;
}

export interface Visit {
  id: string;
  user_pet: string;
  visit_date: string;
  title: string;
  details: string;
}

export interface VisitImage {
  created: string;
  file: string;
  id: string;
  is_prescription: boolean;
  visit: string;
}
