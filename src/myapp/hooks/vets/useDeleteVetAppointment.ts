import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteAppointment = (appointmentId) =>
  api.delete(`api/v1/vets-appointments/`, appointmentId);

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (appointmentId: string) => deleteAppointment(appointmentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('my-appointments');
      },
    },
  );
};

export default useDeleteAppointment;
