import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deletePet = (data) => api.delete(`api/v1/pets/`, data.id);

const useDeletePet = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => deletePet(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      navigation.navigate('Home');
    },
  });
};

export default useDeletePet;
