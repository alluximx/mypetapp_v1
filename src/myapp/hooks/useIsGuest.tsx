import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import CustomModal from '../components/modals/custom-modal';

const useIsGuest = (): [boolean, () => void, () => React.ReactElement] => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useContext(AuthContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onLoginAccept = () => {
    authContext.signOutGuest();
  };

  const renderAlert = () => {
    return (
      <CustomModal
        labelAccept="Iniciar sesión"
        title="Inicio de sesión requerido"
        text="Para realizar esta acción necesitas iniciar sesión o registrarte."
        onAccept={onLoginAccept}
        onCancel={() => setIsModalVisible(false)}
        showCancel={true}
        visible={isModalVisible}
      />
    );
  };

  const isGuest = authContext.isGuest;

  return [isGuest, showModal, renderAlert];
};

export default useIsGuest;
