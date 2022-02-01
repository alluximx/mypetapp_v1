import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useVetAppointments = (vetAdminId: string) =>
  useQuery(['vet-settings', vetAdminId], () =>
    api.get(`api/v1/vets-appointments/${vetAdminId}/get_appointments/`, true),
  );

export default useVetAppointments;
