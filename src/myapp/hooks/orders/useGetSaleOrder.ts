import {AxiosError} from 'axios';
import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetSaleOrder = (id: string, hasLoadedAlready: boolean) =>
  useQuery(['order', id], () => api.get(`api/v1/sales-order/${id}/`, true), {
    enabled: !hasLoadedAlready,
    onError: (err: AxiosError) => {
      console.info(err.response);
      console.info(err.response.data);
    },
  });

export default useGetSaleOrder;
