import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteRequest = (id: string) =>
  api.delete(`api/v1/adoption-request/`, id);

const useDeleteAdoptionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteRequest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-adoption-requests');
    },
  });
};

export default useDeleteAdoptionRequest;
