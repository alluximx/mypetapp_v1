import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';
import {Appointment} from '../../types/models';

const deleteAppointment = (appointment: Appointment) =>
  api.post(
    `api/v1/vets-appointments/${appointment.id}/app_cancel/`,
    {
      has_cancel_penalty: appointment.has_cancel_penalty,
    },
    true,
  );

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (appointment: Appointment) => deleteAppointment(appointment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('my-appointments');
      },
    },
  );
};

export default useDeleteAppointment;
