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
    onSuccess: (response, variables) => {
      const cardBrand = response.data.brand;
      const cardId = response.data.id;
      const cardLabel = '****' + response.data.last4;
      const screenToReturn = variables.screenToReturn;
      const screenFrom = variables.screenFrom;

      const auxData = {cardBrand, cardId, cardLabel};
      // Save User Address
      navigation.navigate(screenToReturn, {
        data: {paymentMethod: auxData, screenFrom: screenFrom},
      });
      queryClient.invalidateQueries('user-cards');
    },
  });
};

export default useSavePaymentMethod;
