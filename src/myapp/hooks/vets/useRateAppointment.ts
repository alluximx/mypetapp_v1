import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAppointment = (data) =>
  api.post(`api/v1/vets-appointments/${data.id}/rate_appointment/`, data, true);

const useRateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAppointment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-appointments');
    },
  });
};

export default useRateAppointment;
