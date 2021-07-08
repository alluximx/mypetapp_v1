import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const useIsGuest = () => {
  const authContext = useContext(AuthContext);
  const isGuest = authContext.goHomeAsGuest();

  return isGuest;
};

export default useIsGuest;
