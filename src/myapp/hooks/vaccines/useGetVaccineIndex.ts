import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccineIndex = (petId) => {
  return useQuery(['pet-vaccines', petId], () =>
    api.get('api/v1/vaccines-history?user_pet=' + petId, true),
  );
};

export default useGetVaccineIndex;
