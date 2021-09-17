import {useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
// Context
import {AuthContext} from '../../context/AuthContext';
// Hooks
import useMyPets from './useMyPets';
// Services
import auth_service from '../../services/auth-service';

const useMyNameAndPets = () => {
  const authContext = useContext(AuthContext);

  const [data, setData] = useState({
    isLoading: false,
    userName: '',
    pets: [],
  });

  if (!authContext.isGuest) {
    useEffect(() => {
      setData({
        ...data,
        isLoading: true,
      });
    }, []);

    const profileQuery = useQuery('my-profile', () => auth_service.me());
    const userId = profileQuery.data?.data.id;
    authContext.setUserId(userId);
    const petsQuery = useMyPets(authContext.isGuest, userId);

    useEffect(() => {
      // Update profile data if success...
      if (profileQuery.isSuccess) {
        setData({
          ...data,
          userName: profileQuery.data?.data.name,
        });
      }
    }, [profileQuery.data]);

    useEffect(() => {
      // Update pets data if sucess...
      if (petsQuery.isSuccess) {
        setData({
          ...data,
          pets: petsQuery.data?.data,
          isLoading: false,
        });
      }
    }, [petsQuery.data]);
  }

  return data;
};

export default useMyNameAndPets;
