import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useMyPetImage = (petId: string) => {
  return useQuery(
    ['my-pet-image', petId],
    () => api.get('api/v1/pets_images/?pet_image=' + petId, true),
    {
      enabled: petId !== null,
    },
  );
};

export default useMyPetImage;
