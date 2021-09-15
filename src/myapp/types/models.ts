interface GenericModel {
  id: string;
  name: string;
}

export interface Brand extends GenericModel {
  is_active?: boolean;
}

export interface Breed extends GenericModel {}

export interface Category extends GenericModel {
  is_active?: boolean;
}

export interface Pet extends GenericModel {
  birthday: string;
  breed: Breed;
  image: string;
  ownerUser: User;
  pet_age: {
    months: number;
    years: number;
  };
  size: Size;
}

export interface Product extends GenericModel {
  brand: Brand;
  category: Category;
  cover_image?: string;
  description: string;
  is_active: boolean;
  range_prices?: {
    price__max: number;
    price__min: number;
  };
}

export interface Size extends GenericModel {}

export interface User extends GenericModel {
  email?: string;
  password?: string;
  username: string;
}

export interface Vaccine {
  id?: string;
  is_unique: boolean;
  is_vaccine: boolean;
  vaccine_name: string;
}

export interface VaccineHistory {
  id?: string;
  is_vaccine: boolean;
  next_vaccine_date: string | Date;
  reminder: string | Date;
  user_pet: string;
  vaccine_date: string | Date;
  vaccine_registered: string;
}

export interface Visit {
  details: string;
  id: string;
  title: string;
  user_pet: string;
  visit_date: string;
}

export interface VisitImage {
  created: string;
  file: string;
  id: string;
  is_prescription: boolean;
  visit: string;
}
