import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAppointment = (data, isSalon: boolean) =>
  api.post(`api/v1/${isSalon ? 'vets' : 'salons'}-appointments/`, data, true);

const useAddAppointment = (adminId: string, isSalon: boolean = false) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAppointment(data, isSalon), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        `${isSalon ? 'vet' : 'salons'}-settings`,
        adminId,
      ]);
      queryClient.invalidateQueries([
        `${isSalon ? 'vet' : 'salons'}-appointments`,
        adminId,
      ]);
      queryClient.invalidateQueries('my-appointments');
    },
    onError: (err, variables) => {
      console.log(err.response.data);
      console.log(variables);
    },
  });
};

export default useAddAppointment;
