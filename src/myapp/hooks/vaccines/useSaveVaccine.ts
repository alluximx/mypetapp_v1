import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
// Hooks.
// import useSavePetImage from './useSavePetImage';

const postVaccine = (data) => {
  console.log(data);
  return api.post('api/v1/vaccines-history/', data, true);
};

const useSaveVaccine = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  // const savePetImageQuery = useSavePetImage();

  return useMutation((data: any) => postVaccine(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      // savePetImageQuery.mutate(
      //   {
      //     pet_image: response.data.id,
      //     file: variables.image,
      //   },
      //   {
      //     // Only after the pet image has been created...
      //     onSuccess: () => {
      //       navigation.navigate('Home');
      //       queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      //     },
      //   },
      // );
      navigation.navigate('VaccinesIndex');
    },
  });
};

export default useSaveVaccine;
