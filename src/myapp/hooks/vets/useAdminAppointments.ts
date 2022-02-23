import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useAdminAppointments = (adminId: string, isSalon: boolean = false) =>
  useQuery(['admin-appointments', adminId], () =>
    api.get(
      `api/v1/${
        isSalon ? 'salons' : 'vets'
      }-appointments/${adminId}/get_appointments/`,
      true,
    ),
  );

export default useAdminAppointments;
