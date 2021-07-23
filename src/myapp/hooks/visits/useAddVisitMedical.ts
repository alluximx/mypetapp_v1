import {useQuery} from 'react-query';
import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';

const postAddVisits = (data) => api.post('api/v1/vetvisits/', data, true);
const useAddVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => postAddVisits(data), {
    onSuccess: (response) => {
      // Save Pet image.
      console.log(response);
      queryClient.invalidateQueries(['visits-information']);
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useAddVisitMedical;
