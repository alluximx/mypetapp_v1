import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetPaymentMethods = () => {
  return useQuery('user-cards', () => api.get('api/v1/user-list-cards/', true));
};

export default useGetPaymentMethods;
