import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
const postUpdateImag = (data) => {
  const newData = [
    {name: 'visit', data: data.idVisit},
    {name: 'file', filename: 'visit-img.png', data: data.img},
    {name: 'is_prescription', data: data.flag},
  ];
  return api.put('api/v1/visit-images/' + data.id + '/', newData, true, true);
};

const useUpdateImage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation((data: any) => postUpdateImag(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['visits-image', variables.idVisit]);
      //navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
export default useUpdateImage;
