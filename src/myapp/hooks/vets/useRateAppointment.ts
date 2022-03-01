import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAppointment = (data, isSalon: boolean) =>
  api.post(
    `api/v1/${isSalon ? 'salons' : 'vets'}-appointments/${
      data.id
    }/rate_appointment/`,
    data,
    true,
  );

const useRateAppointment = (isSalon: boolean) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAppointment(data, isSalon), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-vet-appointments');
      queryClient.invalidateQueries('my-salon-appointments');
    },
  });
};

export default useRateAppointment;
