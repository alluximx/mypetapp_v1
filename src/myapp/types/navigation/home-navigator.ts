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

  AdoptionFilter: {};
  AdoptionResult: {};
  AdoptionDetail: {};
  AdoptionAdvanceFilter: {};
  AdoptionRequest: {};

  ProductList: {};
  ProductFilter: {};
  Orders: {};
  ProductDetail: {};
  Cart: {};

  Breed: {};
  DetailBreed: {};
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;

export default HomeNavigatorParamList;
