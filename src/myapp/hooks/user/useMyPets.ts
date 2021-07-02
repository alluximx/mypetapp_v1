import {useQuery} from 'react-query';
import api from '../../services/app-services';

const useMyPets = (userId: number) => {
  return useQuery(['my-pets', userId], () =>
    api.get('api/v1/pets/?owner_user=' + userId, true),
  );
};

export default useMyPets;
