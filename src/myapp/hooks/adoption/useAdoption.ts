import api from '../../services/app-services';
import {useMutation, useQueryClient} from 'react-query';

const AddAdoption = (data) => api.post('api/v1/adoption-request/', data, true);

const useAdoption = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => AddAdoption(data), {
    onSuccess: () => {
      // Save adoption.
      queryClient.invalidateQueries('request-adoptionAll');
      queryClient.invalidateQueries('adoption-request');
    },
  });
};

export default useAdoption;
