import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteShoppingCart = (cartId: string) =>
  api.delete(`api/v1/shopping-cart/`, cartId);

const useDeleteShoppingCart = (userId: number) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((cartId: string) => deleteShoppingCart(cartId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['shopping-cart', userId]);
      queryClient.refetchQueries(['shopping-cart', userId]);
      // navigation.navigate('Home');
    },
  });
};

export default useDeleteShoppingCart;
