import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postPaymentMethod = (data) => {
  const formattedData = {
    card: {
      ...data,
      number: data.number.replace(/ /g, ''),
      exp_month: data.expiration_date.split('/')[0],
      exp_year: data.expiration_date.split('/')[1],
    },
  };
  console.log(formattedData);
  return api.post('api/v1/user-cards/', formattedData, true);
};

const useSavePaymentMethod = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => postPaymentMethod(data), {
    onSuccess: (response, variables) => {
      // Save User Address
      navigation.navigate('MyProfile', {data: variables});
      queryClient.invalidateQueries('user-card');
    },
  });
};

export default useSavePaymentMethod;
