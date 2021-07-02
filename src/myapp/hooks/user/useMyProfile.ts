import {useQuery} from 'react-query';
import auth_service from '../../services/auth-service';

const useMyProfile = (isGuest) => {
  if (isGuest) {
    return {
      data: {
        data: {
          username: '',
        },
      },
      isLoading: false,
    };
  }

  return useQuery('my-profile', () => auth_service.me());
};

export default useMyProfile;
