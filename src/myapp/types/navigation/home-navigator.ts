import {DetailBreed} from './../../scenes/breed/detail.component';
import {RouteProp} from '@react-navigation/native';

type HomeNavigatorParamList = {
  Home: {
    isGuest: boolean;
  };
  AddPet: {};
  DewormingIndex: {};
  AddDeworming: {};
  DetailPet: {};
  EditPet: {};
  AddVaccine: {};
  EditVaccine: {};
  AddVisit: {};
  ClinicalHistory: {};
  Orders: {};
  ProductList: {};
  ProductDetail: {};
  Cart: {};
  ServicesDoc: {};
  Breed: {};
  DetailBreed: {};
  NewVisitMedical: {};
  VaccinesIndex: {};
  AdoptionFilter: {};
  DewormingHistory: {};
  ProductIndex: {};
  AdoptionResult: {};
  AdoptionDetail: {};
  AdoptionAdvanceFilter: {};
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;

export default HomeNavigatorParamList;
