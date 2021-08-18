import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
const AddAdoption = (data) => api.post('api/v1/adoption-request/', data, true);
const useAdoption = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation((data: any) => AddAdoption(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
export default useAdoption;
