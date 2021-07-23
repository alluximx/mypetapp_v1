import {DetailBreed} from './../../scenes/breed/detail.component';
import {RouteProp} from '@react-navigation/native';

type HomeNavigatorParamList = {
  Home: {
    isGuest: boolean;
  };
  AddPet: {};
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
};

export type HomeRouteParams = RouteProp<HomeNavigatorParamList, 'Home'>;

export default HomeNavigatorParamList;
