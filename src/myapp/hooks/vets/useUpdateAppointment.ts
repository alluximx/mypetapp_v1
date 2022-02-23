import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const putAppointment = (data, isSalon: boolean) =>
  api.put(
    `api/v1/${isSalon ? 'salons' : 'vets'}-appointments/${data.id}/`,
    data,
    true,
  );

const useUpdateAppointment = (isSalon: boolean = false) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => putAppointment(data, isSalon), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-appointments');
    },
  });
};

export default useUpdateAppointment;
