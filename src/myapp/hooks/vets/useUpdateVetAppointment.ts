import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const putAppointment = (data) =>
  api.put(`api/v1/vets-appointments/${data.id}/`, data, true);

const useUpdateVetAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => putAppointment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-appointments');
    },
  });
};

export default useUpdateVetAppointment;
