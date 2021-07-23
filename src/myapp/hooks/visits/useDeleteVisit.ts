import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteVisit = (id) => {
  return api.delete(`api/v1/vetvisits/`, id);
};
const useDeleteVisit = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation((data: any) => deleteVisit(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['visits-information']);
      navigation.goBack();
    },
  });
};
export default useDeleteVisit;
