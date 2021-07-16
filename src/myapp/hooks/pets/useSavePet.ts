import {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {Pet} from 'src/myapp/types/models';
import api from '../../services/app-services';
// Hooks.
import useSavePetImage from './useSavePetImage';

const postPet = (data) => {
  return api.post('api/v1/pets/', data, true);
};

const useSavePet = () => {
  const queryClient = useQueryClient();
  const savePetImageQuery = useSavePetImage();

  return useMutation((data: any) => postPet(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      savePetImageQuery.mutate({
        pet_image: response.data.id,
        file: variables.image,
      });
      queryClient.invalidateQueries(['my-pets', variables.owner_user]);
    },
  });
};

export default useSavePet;
