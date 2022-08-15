import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const putAddress = (data) => {
  return api.put(`api/v1/app-user-address/${data.id}/`, data, true);
};

const useSaveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => putAddress(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('user-address');
    },
  });
};

export default useSaveAddress;
