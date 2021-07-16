import {useMutation, useQueryClient} from 'react-query';
import api from '../../services/app-services';

const putPet = (data) => {
  delete data.breedId;
  delete data.sizeId;
  return api.put('api/v1/pets/' + data.id + '/', data, true);
};

const useUpdatePet = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => putPet(data), {
    onSuccess: (response, variables) => {
      console.log('Response', response);
      console.log('successs');
      queryClient.invalidateQueries(['my-pets', variables.owner_user]);
    },
  });
};

export default useUpdatePet;
