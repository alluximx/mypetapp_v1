import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccineIndex = (petId, isVaccine, vaccineRegistered, rangeDate) => {
  return useQuery(
    ['pet-vaccines', petId, vaccineRegistered, rangeDate, isVaccine],
    () =>
      api.get(
        'api/v1/vaccines-history/?user_pet=' +
          petId +
          '&vaccine_registered=' +
          vaccineRegistered +
          '&vaccine_date__range=' +
          rangeDate +
          '&is_vaccine=' +
          isVaccine,
        true,
      ),
  );
};

export default useGetVaccineIndex;
