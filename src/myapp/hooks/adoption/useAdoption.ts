import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';

const AddAdoption = (data) => api.post('api/v1/adoption-request/', data, true);

const useAdoption = () => {
  const navigation = useNavigation();
  return useMutation((data: any) => AddAdoption(data), {
    onSuccess: () => {
      // Save Pet image.
      navigation.goBack();
    },
  });
};

export default useAdoption;
