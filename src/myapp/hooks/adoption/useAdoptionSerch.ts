import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useAdoptionSerch = (data) => {
  return useQuery('adoption-serch', () =>
    api.get(
      'api/v1/addoption_publications/?state=' +
        data.stateId +
        '&municipality=' +
        data.municipalityId,
      true,
    ),
  );
};
export default useAdoptionSerch;
