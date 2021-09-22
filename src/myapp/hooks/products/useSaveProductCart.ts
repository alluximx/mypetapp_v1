import {useNavigation} from '@react-navigation/native';
import {QueryClient, useMutation} from 'react-query';
import api from '../../services/app-services';

const postProductCar = (data) => {
  return api.post('api/v1/shopping-cart/', data, true);
};

const useSaveProductCart = (userId: number) => {
  const queryClient = new QueryClient();
  const navigation = useNavigation();
  return useMutation((data: any) => postProductCar(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['shopping-cart', userId]);
      queryClient.refetchQueries(['shopping-cart', userId]);
      navigation.navigate('ProductList');
    },
  });
};

export default useSaveProductCart;
