import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
// Hooks.
import useSaveVaccineImage from './useSaveVaccineImage';

const postVaccine = (data) => api.post('api/v1/vaccines-history/', data, true);

const useSaveVaccine = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const saveVaccineImageQuery = useSaveVaccineImage();

  return useMutation((data: any) => postVaccine(data), {
    onSuccess: (response, variables) => {
      if (variables.etiquetteImage) {
        // Save vaccine image.
        saveVaccineImageQuery.mutate(
          {
            vaccine: response.data.id,
            file: variables.etiquetteImage,
          },
          {
            // Only after the pet image has been created...
            onSuccess: () => {
              queryClient.invalidateQueries([
                'use-vaccine-image',
                response.data.id,
              ]);
              queryClient.invalidateQueries([
                'pet-vaccines',
                variables.user_pet,
              ]);
              queryClient.invalidateQueries([
                'pet-vaccines-reminder',
                variables.user_pet,
              ]);
              navigation.goBack();
            },
          },
        );
      } else {
        queryClient.invalidateQueries(['pet-vaccines', variables.user_pet]);
        queryClient.invalidateQueries([
          'pet-vaccines-reminder',
          variables.user_pet,
        ]);
        navigation.goBack();
      }
    },
  });
};

export default useSaveVaccine;
