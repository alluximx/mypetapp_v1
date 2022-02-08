import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAppointment = (data) =>
  api.post('api/v1/vets-appointments/', data, true);

const useAddVetAppointment = (vetAdminId: string) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAppointment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['vet-settings', vetAdminId]);
      queryClient.invalidateQueries(['vet-appointments', vetAdminId]);
      queryClient.invalidateQueries('my-appointments');
    },
  });
};

export default useAddVetAppointment;
