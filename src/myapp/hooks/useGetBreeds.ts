import {useQuery} from 'react-query';
import api from '../services/app-services';

const useGetBreeds = () => {
  return useQuery('use-breeds', () => api.get('api/v1/breeds/', true));
};

export default useGetBreeds;
