import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useSizes = (loadSizes: boolean = true) => {
  return useQuery('sizes', () => api.get('api/v1/sizes/', true), {
    enabled: loadSizes,
  });
};

export default useSizes;
