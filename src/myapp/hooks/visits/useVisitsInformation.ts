import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVisitsInformation = (petId: string) =>
  useQuery(['visits-information', petId], () =>
    api.get(`api/v1/vetvisits/?user_pet=${petId}`, true),
  );

export default useVisitsInformation;
