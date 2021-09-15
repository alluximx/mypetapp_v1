import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetBrands = () =>
  useQuery('brands', () => api.get('api/v1/brands/?is_active=true', true));

export default useGetBrands;
