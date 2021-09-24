import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetAddresses = () => {
  return useQuery('user-address', () =>
    api.get('api/v1/app-user-address/', true),
  );
};

export default useGetAddresses;
