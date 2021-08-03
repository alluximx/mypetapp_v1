import {useQuery} from 'react-query';
import api from '../../services/app-services';
const useMunicipality = (id) => {
  return useQuery(['general-municipality', id], () =>
    api.get('api/v1/municipality/?state=' + id, true),
  );
};
export default useMunicipality;
