import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';

const postUpdateVisits = (data) => {
  const newData = {
    user_pet: data.user_pet,
    visit_date: data.visit_date,
    title: data.title,
    details: data.details,
  };

  return api.put('api/v1/vetvisits/' + data.id + '/', newData, true);
};
const useUpdateVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => postUpdateVisits(data), {
    onSuccess: (response) => {
      // Save Pet image.
      queryClient.invalidateQueries(['visits-information']);
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateVisitMedical;
