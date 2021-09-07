import {RouteProp} from '@react-navigation/native';

type HomeNavigatorParamList = {
  Home: {
    isGuest: boolean;
  };

  AddPet: {};
  DetailPet: {};
  EditPet: {};

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
  Orders: {};
  ProductList: {};
  ProductDetail: {};
  Cart: {};

  Breed: {};
  DetailBreed: {};

  AdoptionFilter: {};

  ProductIndex: {};
  AdoptionResult: {};
  AdoptionDetail: {};
  AdoptionAdvanceFilter: {};
  AdoptionRequest: {};

  MyProfile: {};
  AddressInfo: {};
  PaymentMethod: {};
  AddAddress: {};
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;

export default HomeNavigatorParamList;
