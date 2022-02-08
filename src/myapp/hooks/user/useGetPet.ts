import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetPet = (id: string, hasLoadedAlready: boolean = false) =>
  useQuery(['pets', id], () => api.get(`api/v1/pets/${id}`, true), {
    enabled: !hasLoadedAlready,
  });

export default useGetPet;
