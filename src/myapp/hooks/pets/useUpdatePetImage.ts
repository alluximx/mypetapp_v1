import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/app-services';

const putPetImage = (data) => {
  const newData = [
    {name: 'pet_image', data: data.pet_image},
    {name: 'file', filename: 'pet-image.png', data: data.file.base64},
  ];
  console.log('api/v1/pets_images/' + data.id);
  return api.put(`api/v1/pets_images/${data.id}/`, newData, true, true);
};

const useUpdatePetImage = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation((data: any) => putPetImage(data), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['my-pet-image', variables.pet_image]);
      navigation.navigate('Home');
    },
  });
};

export default useUpdatePetImage;
