import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteVaccine = (data) => {
  return api.delete(`api/v1/vaccines-history/`, data.vaccineId);
};

const useDeleteVaccine = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => deleteVaccine(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['pet-vaccines', variables.petId]);
      queryClient.invalidateQueries(['pet-vaccines-reminder', variables.petId]);
      navigation.goBack();
    },
  });
};

export default useDeleteVaccine;
