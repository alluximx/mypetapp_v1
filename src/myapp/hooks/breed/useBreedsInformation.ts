import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useBreedsInformation = () => {
  return useQuery('breed-information' , () =>
    api.get('api/v1/breeds_information/', true),
  );
};

export default useBreedsInformation;