import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVaccineDetail = (vaccineId) =>
  useQuery(['vaccine-detail', vaccineId], () =>
    api.get('api/v1/vaccines-history/' + vaccineId, true),
  );

export default useVaccineDetail;
