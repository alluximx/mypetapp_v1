import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postSaleOrder = (data: any) => {
  return api.post('api/v1/sales-order/', data, true);
};

const useAddSaleOrder = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postSaleOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('get-orders');
      queryClient.invalidateQueries('shopping-cart');
      queryClient.invalidateQueries('get-variants');
    },
  });
};

export default useAddSaleOrder;
