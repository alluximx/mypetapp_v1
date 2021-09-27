import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
import {StackActions} from '@react-navigation/routers';

const postProductCar = (data: any) =>
  api.post('api/v1/shopping-cart/', data, true);

const useSaveProductCart = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation((data: any) => postProductCar(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('shopping-cart');
      navigation.dispatch(StackActions.replace('Cart'));
    },
  });
};

export default useSaveProductCart;
