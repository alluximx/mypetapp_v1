export interface BaseModel {
  id: string;
  name: string;
}

export interface Brand extends BaseModel {
  is_active?: boolean;
}

export interface Category extends BaseModel {
  is_active?: boolean;
}

export interface Cart {
  id: string;
  item_price: number;
  item: string;
  quantity: number;
  total_item_price: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface VariantOption extends Option {
  stock: number;
}

export interface Pet extends BaseModel {
  birthday: string;
  breed: BaseModel;
  image: string;
  ownerUser: User;
  pet_age: {
    months: number;
    years: number;
  };
  size: BaseModel;
}

export interface Product extends BaseModel {
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

export interface User extends BaseModel {
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

export interface Variant extends BaseModel {
  stock: number;
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
