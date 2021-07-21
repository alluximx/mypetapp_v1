import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVisitsInformation = () => {
  return useQuery('visits-information', () =>
    api.get('api/v1/vetvisits/', true),
  );
};

export default useVisitsInformation;
