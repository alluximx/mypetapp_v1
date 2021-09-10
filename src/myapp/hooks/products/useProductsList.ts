import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useProductsList = (categoryId, brandId) =>
  useQuery(['products', categoryId, brandId], () =>
    api.get(
      `api/v1/products/?brand=${brandId}&category=${categoryId}&is_active=true`,
      true,
    ),
  );

export default useProductsList;
