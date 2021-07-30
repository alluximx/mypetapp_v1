import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteImage = (data) => {
  return api.delete(`api/v1/visit-images/`, data.id);
};
const useDeleteImages = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation((data: any) => deleteImage(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries('visits-information');
      queryClient.invalidateQueries(['visits-image', variables.idVisita]);
      //navigation.goBack();
    },
  });
};
export default useDeleteImages;
