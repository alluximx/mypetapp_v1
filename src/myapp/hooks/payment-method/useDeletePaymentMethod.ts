import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteCard = (id) =>
  api.delete(`api/v1/user-list-cards/${id}/delete_card`, '');

const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation((id: any) => deleteCard(id), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries('user-card');
    },
  });
};

export default useDeleteCard;
