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
  const savePetQuery = useSavePetImage();

  return useMutation((data: any) => postPet(data), {
    onSuccess: (response, variables) => {
      // Save Pet image.
      savePetQuery.mutate(
        {
          pet_image: response.data.id,
          file: variables.image,
        },
        {
          onSuccess: (response) => {
            console.log(response);
            // queryClient.invalidateQueries('my-pets');
          },
        },
      );
      // queryClient.invalidateQueries('my-pets');
    },
  });
};

export default useSavePet;
