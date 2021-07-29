import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccines = () =>
  useQuery('use-vaccines', () => api.get('api/v1/vaccines/', true));

export default useGetVaccines;
