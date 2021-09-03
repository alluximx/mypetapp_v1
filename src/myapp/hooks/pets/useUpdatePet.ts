import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/app-services';
// Hooks.
import useUpdatePetImage from './useUpdatePetImage';
import moment from 'moment';

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

  return useMutation((data: any) => putPet(data), {
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['my-pets', variables.owner_user]);
      // If changed Image.
      if (variables.imageChanged) {
        updatePetImageQuery.mutate({
          file: variables.image,
          pet_image: variables.id,
          id: variables.imageId,
        });
      } else {
        navigation.navigate('Home');
      }
    },
  });
};

export default useUpdatePet;
