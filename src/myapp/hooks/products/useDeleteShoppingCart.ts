import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteShoppingCart = (cartId: string) =>
  api.delete(`api/v1/shopping-cart/`, cartId);

const useDeleteShoppingCart = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation((cartId: string) => deleteShoppingCart(cartId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['shopping-cart', userId]);
      queryClient.refetchQueries(['shopping-cart', userId]);
    },
  });
};

export default useDeleteShoppingCart;
