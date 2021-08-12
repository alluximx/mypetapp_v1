import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteVisit = (visitId: string) => {
  return api.delete(`api/v1/vetvisits/`, visitId);
};
const useDeleteMedicalVisit = (petId: string) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation((visitId: string) => deleteVisit(visitId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['visits-information', petId]);
      navigation.goBack();
    },
  });
};
export default useDeleteMedicalVisit;
