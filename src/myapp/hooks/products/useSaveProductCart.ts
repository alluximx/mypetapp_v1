import {useMutation} from 'react-query';
import api from '../../services/app-services';

const postProductCar = (data) => {
  return api.post('api/v1/shopping-cart/', data, true);
};

const useSaveProductCart = () => {
  return useMutation((data: any) => postProductCar(data));
};

export default useSaveProductCart;
