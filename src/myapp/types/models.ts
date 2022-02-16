import {LatLng} from 'react-native-maps';

interface AdoptionImage {
  id: string;
  is_cover: boolean;
  image: string;
}

export interface AdoptionRequest {
  adoption_publication: {
    ageNumber: string;
    ageType: string;
    association: {
      name: string;
    };
    images: AdoptionImage[];
    name: string;
  };
  id: string;
  status: string;
}

export interface Appointment {
  admin_settings?: {
    allowed_changes_without_penalty: number;
    auto_accept_request: boolean;
    cancel_penalty: string;
    minimum_time_for_cancel: number;
    minimum_time_for_reschedule: number;
    reschedule_penalty: string;
  };
  admin_name?: string;
  card_id?: string;
  changes?: number;
  date: string;
  end_time?: string;
  full_end_time?: string;
  full_start_time?: string;
  has_cancel_penalty: boolean;
  has_reschedule_penalty: boolean;
  id: string;
  is_accepted: boolean;
  pet?: {
    id: string;
    name: string;
  };
  pet_image?: {
    file: string;
    id: string;
  }[];
  services: BaseModel[];
  start_time?: string;
  vet: string;
}

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
  item: {
    stock: number;
  };
  quantity: number;
  total_item_price: number;
}

export interface ErrorResponse {
  response: {
    data: any;
  };
}

export interface Option {
  label: string;
  value: string;
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
  images: {image: string}[];
  price: number;
  stock: number;
}

export interface VariantOption extends Option {
  stock: number;
}

export interface Vet extends BaseModel {
  location: LatLng;
}

export interface VetSettings {
  base_charge?: number;
  is_configured?: boolean;
  start_time?: string;
  end_time?: string;
  time_slots?: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
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
