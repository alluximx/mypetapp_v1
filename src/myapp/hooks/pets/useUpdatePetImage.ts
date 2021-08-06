import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/app-services';
import RNFetchBlob from 'rn-fetch-blob';

const putPetImage = (data) => {
  const newData = [
    {name: 'pet_image', data: data.pet_image},
    {
      name: 'file',
      filename: data.file.fileName,
      type: data.file.type,
      data: RNFetchBlob.wrap(data.file.uri),
    },
  ];
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
