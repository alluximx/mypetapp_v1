import {RouteProp} from '@react-navigation/native';
import {Appointment} from '../models';

type HomeNavigatorParamList = {
  Home: {
    isGuest: boolean;
  };

  AddPet: {};
  DetailPet: {};
  EditPet: {};
  PetSelect: {};

  AddVisit: {};
  NewVisitMedical: {};
  ServicesDoc: {};

  AddDeworming: {};
  DewormingHistory: {};
  EditDeworming: {
    vaccineId: string;
  };

  AddVaccine: {};
  EditVaccine: {};
  VaccinesIndex: {};

  ClinicalHistory: {};

  AdoptionFilter: {};
  AdoptionResult: {};
  AdoptionDetail: {};
  AdoptionAdvanceFilter: {};
  AdoptionRequest: {};
  MyAdoptionRequests: {};

  ProductList: {};
  ProductFilter: {
    brand: string;
    category: string;
    name: string;
    prices: number[];
    setBrand: (brandId: string) => void;
    setPrices: (prices: number[]) => void;
  };
  Orders: {};
  OrdersDetail: {};
  PaymentSummary: {};
  ProductDetail: {};
  Cart: {};

  Breed: {};
  DetailBreed: {};
  MyProfile: {};
  AddressInfo: {};
  PaymentMethod: {};
  AddAddress: {
    data: any;
  };
  AddAddressFromIndex: {};
  AddPaymentMethod: {
    data: any;
  };
  AddPaymentMethodFromIndex: {
    data: any;
  };

  VetResult: {};
  VetFilter: {};
  VetDetail: {};
  VetMaps: {};
  VetDate: {
    isEdit: boolean;
  };

  AestheticResult: {};
  AestheticFilter: {};
  AestheticDetail: {};

  RateService: {
    appointmentId: string;
    services: string;
    isSalon?: string;
  };
  NextServices: {};
  ServiceSelect: {};
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;
export type RateRouteParams = RouteProp<HomeNavigatorParamList, 'RateService'>;

export default HomeNavigatorParamList;
