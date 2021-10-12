import {RouteProp} from '@react-navigation/native';

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
  AddPaymentMethod: {
    data: any;
  };

  VetResult: {};
  VetFilter: {};
  VetDetail: {};
  VetDate: {};

  AestheticResult: {};
  AestheticFilter: {};
  AestheticDetail: {};

  ServiceSelect: {};
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;

export default HomeNavigatorParamList;
