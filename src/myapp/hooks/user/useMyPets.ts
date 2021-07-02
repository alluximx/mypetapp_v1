import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useMyPets = () => {
  return useQuery('my-pets', () => api.get('api/v1/pets', true));
};

export default useMyPets;
