import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';
// Hooks.
import useSavePetImage from './useSavePetImage';

const postPet = (data) => api.post('api/v1/pets/', data, true);

const useSavePet = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const savePetImageQuery = useSavePetImage();

  return useMutation((data: any) => postPet(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      savePetImageQuery.mutate(
        {
          pet_image: response.data.id,
          file: variables.image,
        },
        {
          // Only after the pet image has been created...
          onSuccess: () => {
            navigation.navigate('Home');
            queryClient.invalidateQueries(['my-pets', variables.owner_user]);
          },
        },
      );
    },
  });
};

export default useSavePet;
