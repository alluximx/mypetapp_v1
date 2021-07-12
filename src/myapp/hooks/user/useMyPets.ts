import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useMyPets = (isGuest: boolean, userId: number) => {
  if (isGuest) {
    return {
      data: {
        data: [],
      },
      isLoading: false,
      isSuccess: true,
    };
  }

  return useQuery(['my-pets', userId], () =>
    api.get('api/v1/pets/?owner_user=' + userId, true),
  );
};

export default useMyPets;
