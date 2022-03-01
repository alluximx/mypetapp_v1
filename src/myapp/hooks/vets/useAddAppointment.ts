import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAppointment = (data, isSalon: boolean) =>
  api.post(`api/v1/${isSalon ? 'salons' : 'vets'}-appointments/`, data, true);

const useAddAppointment = (adminId: string, isSalon: boolean = false) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAppointment(data, isSalon), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        `${isSalon ? 'salons' : 'vet'}-settings`,
        adminId,
      ]);
      queryClient.invalidateQueries([
        `${isSalon ? 'salons' : 'vet'}-appointments`,
        adminId,
      ]);
      queryClient.invalidateQueries(
        `my-${isSalon ? 'salon' : 'vet'}-appointments`,
      );
    },
  });
};

export default useAddAppointment;
