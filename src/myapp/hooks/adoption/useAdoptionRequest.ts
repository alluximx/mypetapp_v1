import {useQuery} from 'react-query';
import api from '../../services/app-services';
const UseAdoptionRequest = (data) => {
  return useQuery('adoption-request', () =>
    api.get('api/v1/adoption-request/' + data + '/requested/', true),
  );
};
export default UseAdoptionRequest;
