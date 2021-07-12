import {useQuery} from 'react-query';
import api from '../services/app-services';

const useGetBreeds = (isGuest) => {
    if (isGuest) {
        return {
          data: {
            data: [],
          },
          isLoading: false,
        };
      }

   return useQuery( 'use-breeds', () => api.get('/api/v1/breads/', true) )
}

export default useGetBreeds;
