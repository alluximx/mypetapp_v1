import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
// Services.
import api from '../../services/app-services';

const deleteVaccineImage = (vaccine_image_id) => {
  return api.delete(`api/v1/vaccine-images/`, vaccine_image_id);
};

const useDeleteVaccineImage = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation(
    (vaccine_image_id: string) => deleteVaccineImage(vaccine_image_id),
    {
      onSuccess: (response, vaccine_image_id) => {
        queryClient.invalidateQueries('use-vaccine-image');
        queryClient.invalidateQueries(['use-vaccine-image', vaccine_image_id]);
        navigation.goBack();
      },
    },
  );
};

export default useDeleteVaccineImage;
