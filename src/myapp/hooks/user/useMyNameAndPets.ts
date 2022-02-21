import {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
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

  useEffect(() => {
    setData({
      ...data,
      isLoading: true,
    });
  }, []);

  const profileQuery = useQuery('my-profile', () => auth_service.me());
  const userId = profileQuery.data?.data.id;
  authContext.setUserId(userId);
  const petsQuery = useMyPets(userId);

  useEffect(() => {
    // Update profile data if success...
    if (profileQuery.isSuccess) {
      setData({
        ...data,
        userName: profileQuery.data?.data.name,
      });
    }
    if (profileQuery.isError) {
      Alert.alert(
        'Ocurrió un error',
        'Hubo un problema al recuperar tu perfil, intenta nuevamente.',
      );
      authContext.signOut();
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

  return data;
};

export default useMyNameAndPets;
