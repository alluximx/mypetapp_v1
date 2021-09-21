import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const updateShoppingCart = (data: any) => {
  return api.put(`api/v1/shopping-cart/${data.id}/`, data, true);
};

const useUpdateShoppingCart = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateShoppingCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['shopping-cart', userId]);
      queryClient.refetchQueries(['shopping-cart', userId]);
    },
  });
};

export default useUpdateShoppingCart;
