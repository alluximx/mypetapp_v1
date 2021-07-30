import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
// Hooks.
// import useSavePetImage from './useSavePetImage';

const putVaccine = (data, vaccineId) =>
  api.put(`api/v1/vaccines-history/${vaccineId}/`, data, true);

const useUpdateVaccine = (vaccineId) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  // const savePetImageQuery = useSavePetImage();

  return useMutation((data: any) => putVaccine(data, vaccineId), {
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
      //     },
      //   },
      // );
      queryClient.invalidateQueries(['vaccine-detail', vaccineId]);
      navigation.goBack();
    },
  });
};

export default useUpdateVaccine;
