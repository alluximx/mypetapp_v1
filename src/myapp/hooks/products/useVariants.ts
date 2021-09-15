import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVariants = (productId: string) => {
  return useQuery(['get-variants', productId], () =>
    api.get('api/v1/variants/?product=' + productId + '&is_active=true', true),
  );
};

export default useVariants;
