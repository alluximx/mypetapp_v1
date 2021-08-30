import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useAdoptionRequestAll = (data) => {
  return useQuery('request-adoptionAll', () =>
    api.get(
      'api/v1/adoption-request/' + data + '/allowed_adoptions_request/',
      true,
    ),
  );
};

export default useAdoptionRequestAll;
