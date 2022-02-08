import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useAppointments = () =>
  useQuery('my-appointments', () => api.get(`api/v1/vets-appointments/`, true));

export default useAppointments;
