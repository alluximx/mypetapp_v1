import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteAddress = (id) => api.delete(`api/v1/app-user-address/`, id);

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation((id: any) => deleteAddress(id), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries('user-address');
    },
  });
};

export default useDeleteAddress;
