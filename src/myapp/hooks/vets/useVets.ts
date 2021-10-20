import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVets = (data) => {
  return useQuery(
    ['get-vets', data.stateId, data.municipalityId],
    () =>
      api.get(
        `api/v1/vets-directory/?is_active=true&state=${data.stateId}&municipality=${data.municipalityId}`,
        true,
      ),
    {enabled: data.status},
  );
};

export default useVets;
