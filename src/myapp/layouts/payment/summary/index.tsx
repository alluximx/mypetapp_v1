import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
// Hooks
import useDeliveryInformation from '../../../hooks/delivery/useDeliveryInformation';
import useMyProfile from '../../../hooks/user/useMyProfile';
// My Components
import CustomButton from '../../../components/buttons/custom-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import TitleHeader from '../../../components/texts/title-header';
import CustomSpinner from '../../../components/custom-spinner';
import globalVars from '../../../styles/vars';

export default ({navigation, route}): React.ReactElement => {
  const {data: deliveryMessage, isLoading} = useDeliveryInformation();
  const {price, message} = deliveryMessage?.data[0];
  const {subtotal} = route.params;
  const total = (parseFloat(subtotal) + parseFloat(price)).toFixed(2);

  const [contentSubtitle, setContentSubtitle] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [address, setAddress] = useState();
  const myProfile = useMyProfile();
  useEffect(() => {
    if (route.params?.data) {
      // const dataParam = route.params.data;
      // setAddress(dataParam);
      // const content =
      //   dataParam.street +
      //   ' #' +
      //   dataParam.number +
      //   '\n' +
      //   dataParam.zipcode +
      //   ', ' +
      //   dataParam.city +
      //   ' ' +
      //   dataParam.state.name_state;
      // setContentSubtitle(content);
      setContentSubtitle('');
      setContentTitle(myProfile.data?.data.name);
    } else {
      setContentSubtitle('Selecciona dirección de envio');
    }
  }, [route.params?.data]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout
      statusBarStyle={'dark-content'}
      style={[styles.container, {color: 'black'}]}>
      <TitleHeader style={{marginHorizontal: globalVars.outsidePadding}}>
        Pago
      </TitleHeader>
      <ScrollView style={styles.layoutPort}>
        <TitleHeader style={styles.titleText}>Dirección de envío</TitleHeader>
        <NavigateButton
          navigation={navigation}
          title={contentTitle}
          subtitle={contentSubtitle}
          destination={'AddAddress'}
        />
        <TitleHeader style={styles.titleText}>Método de pago</TitleHeader>
        <NavigateButton
          navigation={navigation}
          subtitle={'Selecciona el método de pago'}
          destination={'AddPaymentMethod'}
        />
        <TitleHeader style={styles.titleText}>Envío</TitleHeader>
        <DefaultText>
          El precio por envío fijo es de ${price} MXN. {message}
        </DefaultText>
      </ScrollView>
      <View style={styles.summaryContainer}>
        <View style={styles.infoSummary1}>
          <DefaultText style={styles.defaultText}>Subtotal</DefaultText>
          <DefaultText style={styles.defaultText}>Envío</DefaultText>
          <TitleHeader style={styles.defaultText}>Total</TitleHeader>
        </View>
        <View style={styles.infoSummary2}>
          <DefaultText style={styles.defaultText}>${subtotal}</DefaultText>
          <DefaultText style={styles.defaultText}>${price}</DefaultText>
          <TitleHeader style={styles.defaultText}>${total}</TitleHeader>
        </View>
      </View>
      <CustomButton
        isDisabled={true}
        onPress={() => {
          // Hacer pedido
        }}
        style={styles.button}>
        Hacer Pedido
      </CustomButton>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  layoutPort: {
    marginLeft: 24,
    marginRight: 8,
    paddingRight: 18,
    backgroundColor: globalColors.backgroundDefault,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  defaultText: {
    marginTop: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    marginHorizontal: globalVars.outsidePadding,
  },
  infoSummary1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoSummary2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    marginBottom: globalVars.outsidePadding,
    marginHorizontal: globalVars.outsidePadding,
  },
});
