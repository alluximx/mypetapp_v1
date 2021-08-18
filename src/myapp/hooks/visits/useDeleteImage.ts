import {useMutation, useQueryClient} from 'react-query';
// Services.
import api from '../../services/app-services';

const deleteImage = (data: any) => {
  return api.delete(`api/v1/visit-images/`, data.id);
};

const useDeleteImage = (visitId) => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => deleteImage(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['visits-image', visitId]);
    },
  });
};

export default useDeleteImage;
