import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postPaymentMethod = (data) => {
  const formattedData = {
    card: {
      ...data,
      number: data.number.replace(/ /g, ''),
    },
  };
  return api.post('api/v1/user-cards/', formattedData, true);
};

const useSavePaymentMethod = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => postPaymentMethod(data), {
    onSuccess: (response) => {
      const cardBrand = response.data.brand;
      const cardId = response.data.id;
      const cardLabel = '****' + response.data.last4;

      const auxData = {cardBrand, cardId, cardLabel};
      // Save User Address
      navigation.navigate('PaymentSummary', {
        data: {paymentMethod: auxData},
      });
      queryClient.invalidateQueries('user-card');
    },
  });
};

export default useSavePaymentMethod;
