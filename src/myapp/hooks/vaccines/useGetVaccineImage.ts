import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useGetVaccineImage = (id) => {
  return useQuery(['use-vaccine-image', id], () =>
    api.get('api/v1/vaccine-images/?vaccine=' + id, true),
  );
};

export default useGetVaccineImage;
