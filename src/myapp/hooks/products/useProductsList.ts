import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useProductsList = (categoryId) => {
  return useQuery(['products', categoryId], () =>
    api.get(`api/v1/products/?category=${categoryId}&is_active=true`, true),
  );
};

export default useProductsList;
