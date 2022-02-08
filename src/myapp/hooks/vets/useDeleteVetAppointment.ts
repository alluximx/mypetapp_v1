import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deletePet = (appointmentId) =>
  api.delete(`api/v1/vets-appointments/`, appointmentId);

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation((appointmentId: string) => deletePet(appointmentId), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-appointments');
    },
  });
};

export default useDeleteAppointment;
