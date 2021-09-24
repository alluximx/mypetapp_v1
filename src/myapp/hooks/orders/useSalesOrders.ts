import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useSalesOrders = () => {
  return useQuery(['get-orders'], () => api.get('api/v1/sales-order/', true));
};

export default useSalesOrders;
