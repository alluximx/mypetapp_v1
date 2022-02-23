import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useSalonsSettings = (salonId: string, shouldCallSettings: boolean) =>
  useQuery(
    ['salons-settings', salonId],
    () => api.get(`api/v1/salons-settings/?admin__directory=${salonId}`, true),
    {
      enabled: shouldCallSettings,
    },
  );

export default useSalonsSettings;
