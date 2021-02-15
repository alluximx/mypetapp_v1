import {useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext();
  }, [authContext]);

  return null;
};

export default ResolveAuthScreen;
