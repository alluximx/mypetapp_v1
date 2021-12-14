import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/app-services';
import moment from 'moment';
// Hooks.
import useUpdatePetImage from './useUpdatePetImage';
import useSavePetImage from './useSavePetImage';

const putPet = (data) => {
  delete data.breedId;
  delete data.sizeId;
  const formattedData = {
    ...data,
    birthday: moment.utc(data.birthday).format('YYYY-MM-DD'),
  };
  return api.put('api/v1/pets/' + data.id + '/', formattedData, true);
};

const useUpdatePet = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const updatePetImageQuery = useUpdatePetImage();
  const savePetImageQuery = useSavePetImage();

  return useMutation((data: any) => putPet(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      // If changed Image.
      if (variables.imageChanged) {
        // If it already had an image...
        if (variables.initialImage) {
          // Update it
          updatePetImageQuery.mutate({
            file: variables.image,
            pet_image: variables.id,
            id: variables.imageId,
          });
        } else {
          // Create it
          savePetImageQuery.mutate(
            {
              pet_image: response.data.id,
              file: variables.image,
            },
            {
              // Only after the pet image has been created...
              onSuccess: () => {
                queryClient.invalidateQueries([
                  'my-pet-image',
                  response.data.id,
                ]);
                navigation.navigate('Home');
              },
            },
          );
        }
      } else {
        navigation.navigate('Home');
      }
    },
  });
};

export default useUpdatePet;
