import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
// Hooks.
import useDeleteVaccineImage from './useDeleteVaccineImage';
import useUpdateVaccineImage from './useUpdateVaccineImage';
import useSaveVaccineImage from './useSaveVaccineImage';

const putVaccine = (data, vaccineId) =>
  api.put(`api/v1/vaccines-history/${vaccineId}/`, data, true);

const useUpdateVaccine = (vaccineId) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const updateVaccineImageQuery = useUpdateVaccineImage();
  const saveVaccineImageQuery = useSaveVaccineImage();
  const deleteVaccineImageQuery = useDeleteVaccineImage();

  return useMutation((data: any) => putVaccine(data, vaccineId), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['vaccine-detail', vaccineId]);
      if (variables.imageHasChanged) {
        // if image changed...
        if (variables.etiquetteImage) {
          // And Image Id remains...
          if (variables.vaccine_image_id !== '') {
            // Update Vaccine image.
            updateVaccineImageQuery.mutate(
              {
                vaccine: vaccineId,
                file: variables.etiquetteImage,
                vaccine_image_id: variables.vaccine_image_id,
              },
              {
                // Only after the pet image has been updated...
                onSuccess: () => {
                  queryClient.invalidateQueries([
                    'use-vaccine-image',
                    response.data.id,
                  ]);
                  queryClient.invalidateQueries([
                    'pet-vaccines',
                    variables.user_pet,
                  ]);
                  navigation.goBack();
                },
              },
            );
          } else {
            // Create new image.
            saveVaccineImageQuery.mutate(
              {
                vaccine: vaccineId,
                file: variables.etiquetteImage,
                vaccine_image_id: variables.vaccine_image_id,
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
                  navigation.goBack();
                },
              },
            );
          }
        } else {
          // if was deleted...
          deleteVaccineImageQuery.mutate(variables.vaccine_image_id);
          queryClient.invalidateQueries(['pet-vaccines', variables.user_pet]);
        }
      } else {
        navigation.goBack();
        queryClient.invalidateQueries(['pet-vaccines', variables.user_pet]);
      }
    },
  });
};

export default useUpdateVaccine;
