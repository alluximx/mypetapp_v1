import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccineIndex = (id) => {
  return useQuery(['use-vaccine-index', id], () =>
    api.get('api/v1/vaccines-history?user_pet=' + id, true),
  );
};

export default useGetVaccineIndex;
