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
      <NavigateButton
        navigation={navigation}
        subtitle={'Direcciones'}
        destination={'AddressInfo'}
      />
      <NavigateButton
        navigation={navigation}
        subtitle={'Métodos de Pago'}
        destination={'PaymentMethod'}
      />
      <NavigateButton
        navigation={navigation}
        subtitle={'Pedidos'}
        destination={'Orders'}
      />
      <NavigateButton
        navigation={navigation}
        subtitle={'Solicitudes de Adopción'}
        destination={'AddPaymentMethod'}
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
