import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteShoppingCart = (cartId: string) =>
  api.delete(`api/v1/shopping-cart/`, cartId);

const useDeleteShoppingCart = (isLastOne: boolean) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((cartId: string) => deleteShoppingCart(cartId), {
    onSuccess: () => {
      queryClient.invalidateQueries('shopping-cart');
      if (isLastOne) {
        setTimeout(() => navigation.navigate('ProductList'), 300);
      }
    },
  });
};

export default useDeleteShoppingCart;
