import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const postPetImage = (data) => {
  const newData = [
    {name: 'pet_image', data: data.pet_image},
    {name: 'file', filename: 'pet-image.png', data: data.file.base64},
  ];
  return api.post('api/v1/pets_images/', newData, true, true);
};

const useSavePetImage = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => postPetImage(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('my-pet-image');
    },
  });
};

export default useSavePetImage;
