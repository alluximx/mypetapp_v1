import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVariants = (productId: string) => {
  return useQuery(['get-variants', productId], () =>
    api.get('api/v1/products/' + productId, true),
  );
};

export default useVariants;
