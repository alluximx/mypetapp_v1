import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVetSettings = (vetId: string, shouldCallSettings: boolean) =>
  useQuery(
    ['vet-settings', vetId],
    () => api.get(`api/v1/vets-settings/?admin__directory=${vetId}`, true),
    {
      enabled: shouldCallSettings,
    },
  );

export default useVetSettings;
