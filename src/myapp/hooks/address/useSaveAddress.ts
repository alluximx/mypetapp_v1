import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postAddress = (data) => {
  return api.post('api/v1/app-user-address/', data, true);
};

const useSaveAddress = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAddress(data), {
    onSuccess: (response, variables) => {
      // Save User Address
      navigation.navigate('MyProfile', {data: variables});
      queryClient.invalidateQueries('user-address');
    },
  });
};

export default useSaveAddress;
