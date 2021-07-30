import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteVaccine = (data) => {
  return api.delete(`api/v1/vaccines-history/`, data);
};

const useDeleteVaccine = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => deleteVaccine(data), {
    onSuccess: (response, variables) => {
      // queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      navigation.goBack();
    },
  });
};

export default useDeleteVaccine;
