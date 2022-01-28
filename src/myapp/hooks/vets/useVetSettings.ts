import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVetSettings = (vetId: string) =>
  useQuery(['vet-settings', vetId], () =>
    api.get(`api/v1/vets-settings/?admin__directory=${vetId}`, true),
  );

export default useVetSettings;
