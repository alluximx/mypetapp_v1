import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useProductsList = (categoryId, brandId) => {
  return useQuery(['products', categoryId, brandId], () => {
    console.log(
      `api/v1/products/?brand=${brandId}&category=${categoryId}&is_active=true`,
    );
    return api.get(
      `api/v1/products/?brand=${brandId}&category=${categoryId}&is_active=true`,
      true,
    );
  });
};

export default useProductsList;
