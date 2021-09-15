import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useProductsList = (categoryId = '', name = '', brandId = '') =>
  useQuery(['products', categoryId, name, brandId], () =>
    api.get(
      `api/v1/products/?brand=${brandId}&category=${categoryId}&is_active=true&name__icontains=${name}`,
      true,
    ),
  );

export default useProductsList;
