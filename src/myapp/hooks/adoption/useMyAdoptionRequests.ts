import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useMyAdoptionRequests = () =>
  useQuery('my-adoption-requests', () =>
    api.get('api/v1/adoption-request/', true),
  );

export default useMyAdoptionRequests;
