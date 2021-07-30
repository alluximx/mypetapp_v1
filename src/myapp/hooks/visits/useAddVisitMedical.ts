import {useQuery} from 'react-query';
import api from '../../services/app-services';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import useSaveVisitImage from './useSaveVisitImage';

const postAddVisits = (data) => api.post('api/v1/vetvisits/', data, true);
const useAddVisitMedical = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const useSaveImg = useSaveVisitImage();
  const saveImage = (fieldName, data, flag, id) => {
    const newData = {
      idVisita: id,
      img: data[fieldName]?.base64 ?? {},
      flag: flag,
    };
    console.log(newData);
    console.log(data);
    if (data[fieldName]) {
      useSaveImg.mutate(newData);
    }
  };
  return useMutation((data: any) => postAddVisits(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      saveImage('recetaValue', variables, 'true', response.data.id);
      saveImage('adicional1', variables, 'false', response.data.id);
      saveImage('adicional2', variables, 'false', response.data.id);
      saveImage('adicional3', variables, 'false', response.data.id);
      queryClient.invalidateQueries('visits-information');
      navigation.goBack();
      // useSaveImg.mutate(
      //   {
      //     id: response.data.id,
      //     file: variables.base64,
      //   },
      //   {
      //     // Only after the pet image has been created...
      //     onSuccess: () => {
      //       navigation.navigate('Home');
      //       queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      //     },
      //   },
      // );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useAddVisitMedical;
