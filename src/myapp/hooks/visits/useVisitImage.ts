import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVisitImage = (visitId: string) => {
  return useQuery(['visits-image', visitId], () =>
    api.get('api/v1/visit-images/?visit=' + visitId, true),
  );
};
export default useVisitImage;
