import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useSizes = () => {
  return useQuery('sizes', () => api.get('api/v1/sizes/', true));
};

export default useSizes;
