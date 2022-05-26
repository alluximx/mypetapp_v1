import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetSizes = () =>
  useQuery('sizes', () => api.get('api/v1/sizes/is_active=true', true));

export default useGetSizes;
