import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccines = (isVaccine) =>
  useQuery('use-vaccines', () =>
    api.get(`api/v1/vaccines/?is_vaccine=${isVaccine}`, true),
  );

export default useGetVaccines;
