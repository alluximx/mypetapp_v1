import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetCategories = () => {
  return useQuery('product-categories', () =>
    api.get('api/v1/categories/?is_active=true', true),
  );
};

export default useGetCategories;
