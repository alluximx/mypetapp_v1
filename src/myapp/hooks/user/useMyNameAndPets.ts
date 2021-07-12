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
    const petsQuery = useMyPets(
      authContext.isGuest,
      profileQuery.data?.data.id,
    );

    console.log(profileQuery.isSuccess);

    useEffect(() => {
      // Update profile data if success...
      if (profileQuery.isSuccess) {
        setData({
          ...data,
          userName: profileQuery.data?.data.name,
        });
      } else {
        console.log('There was an error while fetching my profile.');
      }
    }, [profileQuery.isSuccess]);

    useEffect(() => {
      // Update pets data if sucess...
      if (petsQuery.isSuccess) {
        setData({
          ...data,
          pets: petsQuery.data?.data,
          isLoading: false,
        });
      } else {
        console.log('There was an error while fetching my pets.');
      }
    }, [petsQuery.isSuccess]);
  }

  return data;
};

export default useMyNameAndPets;
