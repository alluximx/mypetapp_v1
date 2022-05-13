import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVetVisitsInformation = (petId: string) =>
  useQuery(['vets-clients-visits', petId], () =>
    api.post(
      `api/v1/vets-clients-visits/get_admin_visits/`,
      {pet_id: petId},
      true,
    ),
  );

export default useVetVisitsInformation;
