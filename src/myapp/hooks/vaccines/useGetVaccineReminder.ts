import {useQuery} from 'react-query';
import api from '../../services/app-services';
import moment from 'moment';

const useGetVaccineReminder = (petId) => {
  return useQuery(['pet-vaccines-reminder', petId], () =>
    api.get(
      'api/v1/vaccines-history/?user_pet=' +
        petId +
        '&reminder__gte=' +
        moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      true,
    ),
  );
};

export default useGetVaccineReminder;
