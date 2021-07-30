import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postVisitImage = (data) => {
  const newData = [
    {name: 'visit', data: data.idVisit},
    {name: 'file', filename: 'visit-img.png', data: data.img},
    {name: 'is_prescription', data: data.flag},
  ];
  return api.post('api/v1/visit-images/', newData, true, true);
};
const useSaveVisitImage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation((data: any) => postVisitImage(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['visits-image', variables.idVisit]);
      //navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useSaveVisitImage;
