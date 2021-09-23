import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const updateShoppingCart = (data: any) =>
  api.put(`api/v1/shopping-cart/${data.id}/`, data, true);

const useUpdateShoppingCart = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateShoppingCart(data), {
    onSuccess: () => queryClient.invalidateQueries('shopping-cart'),
  });
};

export default useUpdateShoppingCart;
