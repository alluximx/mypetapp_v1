import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useTermsAndConditions = () =>
  useQuery('terms', () => api.get('api/v1/terms'));

export default useTermsAndConditions;
