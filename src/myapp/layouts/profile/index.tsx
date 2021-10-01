import React, {useContext} from 'react';
import {StyleService} from '@ui-kitten/components';
import {AuthContext} from '../../context/AuthContext';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
import NavigateButton from '../../components/buttons/navigate-button';
import AnchorText from '../../components/texts/anchor-text';
// Global Styles
import globalColors from '../../styles/colors';

export default ({navigation, route}): React.ReactElement => {
  const authContext = useContext(AuthContext);
  return (
    <DefaultLayout>
      <TitleHeader style={{marginBottom: 16}}>Mi Perfil</TitleHeader>
      <NavigateButton placeholder="Direcciones" destination="AddressInfo" />
      <NavigateButton
        placeholder="Métodos de Pago"
        destination="PaymentMethod"
      />
      <NavigateButton placeholder="Pedidos" destination="Orders" />
      <NavigateButton
        placeholder="Solicitudes de Adopción"
        destination="AddAddress"
      />
      <AnchorText onPress={authContext.signOut} style={styles.logOut}>
        Cerrar Sesión
      </AnchorText>
    </DefaultLayout>
  );
};

const styles = StyleService.create({
  logOut: {
    textAlign: 'center',
    color: globalColors.greenSecondary,
    marginTop: 10,
    marginBottom: 16,
  },
});
