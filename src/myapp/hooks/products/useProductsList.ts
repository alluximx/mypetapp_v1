import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useProductsList = (
  categoryId = '',
  name = '',
  brandId = '',
  sizes = [],
) => {
  const sizesList = sizes.join(',');
  return useQuery(['products', categoryId, name, brandId, sizes], () =>
    api.get(
      `api/v1/products/?brand=${brandId}&category=${categoryId}&is_active=true&name__icontains=${name}&sizes__in=${sizesList}`,
      true,
    ),
  );
};

export default useProductsList;
