import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVisitImage = (data) => {
  return useQuery(['visits-image', data], () =>
    api.get('api/v1/visit-images/?visit=' + data, true),
  );
};
export default useVisitImage;
