import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';
import {Appointment} from '../../types/models';

const deleteAppointment = (appointment: Appointment) => {
  const isSalon = appointment.services !== undefined;

  return api.post(
    `api/v1/${isSalon ? 'salons' : 'vets'}-appointments/${
      appointment.id
    }/app_cancel/`,
    appointment,
    true,
  );
};

const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (appointment: Appointment) => deleteAppointment(appointment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('my-vet-appointments');
        queryClient.invalidateQueries('my-salon-appointments');
      },
    },
  );
};

export default useDeleteAppointment;
