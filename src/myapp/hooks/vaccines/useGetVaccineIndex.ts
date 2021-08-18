import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccineIndex = (petId, isVaccine) => {
  return useQuery(['pet-vaccines', petId], () =>
    api.get(
      'api/v1/vaccines-history?user_pet=' + petId + '&is_vaccine=' + isVaccine,
      true,
    ),
  );
};

export default useGetVaccineIndex;
