import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useShoppingCart = (userId: number) =>
  useQuery(['shopping-cart', userId], () =>
    api.get(`api/v1/shopping-cart/?user=${userId}`, true),
  );

export default useShoppingCart;
