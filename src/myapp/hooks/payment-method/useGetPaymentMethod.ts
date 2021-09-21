import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetPaymentMethod = () => {
  return useQuery('user-card', () => api.get('api/v1/user-list-cards/', true));
};

export default useGetPaymentMethod;
