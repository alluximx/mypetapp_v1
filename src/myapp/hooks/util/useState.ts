import {useQuery} from 'react-query';
import api from '../../services/app-services';
const useStates = () => {
  return useQuery('general-states', () => api.get('api/v1/states/', true));
};
export default useStates;
