import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {StackActions} from '@react-navigation/routers';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// Hooks
import useAddSaleOrder from '../../../hooks/orders/useAddSaleOrder';
import useDeliveryInformation from '../../../hooks/delivery/useDeliveryInformation';
import useMyProfile from '../../../hooks/user/useMyProfile';
// My Components
import CustomButton from '../../../components/buttons/custom-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import NavigateButton from '../../../components/buttons/navigate-button';
import TitleHeader from '../../../components/texts/title-header';
import CustomModal from '../../../components/modals/custom-modal';

export default ({navigation, route}): React.ReactElement => {
  const {data: deliveryMessage, isLoading} = useDeliveryInformation();
  const addOrder = useAddSaleOrder();
  const myProfile = useMyProfile();
  const deliveryInfo = deliveryMessage?.data[0];
  const {subtotal} = route.params;
  const total = (
    parseFloat(subtotal) + parseFloat(deliveryInfo?.price)
  ).toFixed(2);

  const [addressContentSubtitle, setAddressContentSubtitle] = useState('');
  const [addressContentTitle, setAddressContentTitle] = useState('');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form, setForm] = useState({
    delivery_address: route.params?.data?.addressId,
    card_id: 'card_1JdBIgJcwi75eaUV40o7gahe',
    delivery_id: deliveryInfo?.id,
  });

  useEffect(() => {
    if (deliveryMessage) {
      setForm({...form, delivery_id: deliveryInfo.id});
    }
  }, [deliveryMessage]);

  const onPressOrder = () => {
    setIsCreatingOrder(true);
    addOrder.mutate(form, {
      onSuccess: () => {
        setIsCreatingOrder(false);
        setIsModalVisible(true);
      },
      onError: () => {
        setIsCreatingOrder(false);
      },
    });
  };

  const onAcceptModal = () => {
    setIsModalVisible(false);
    navigation.dispatch(StackActions.pop(2));
  };

  const isDisabled =
    !form.card_id || !form.delivery_address || !form.delivery_id;

  useEffect(() => {
    if (route.params?.data) {
      if (route.params.data.address) {
        const dataParam = route.params.data.address;
        setForm({...form, delivery_address: dataParam.id});
        const addressContent =
          dataParam.street +
          ' #' +
          dataParam.number +
          '\n' +
          dataParam.zipcode +
          ', ' +
          dataParam.city +
          ' ' +
          dataParam.state.name_state;
        setAddressContentSubtitle(addressContent);
        setAddressContentTitle(myProfile.data?.data.name);
      }
      if (route.params.data.paymentMethod) {
      }
    } else {
      setAddressContentSubtitle('Selecciona dirección de envío');
    }
  }, [route.params?.data]);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout
      statusBarStyle="dark-content"
      style={[styles.container, {color: 'black'}]}>
      <CustomModal
        labelAccept="Entendido"
        title="Pago Exitoso"
        text={
          'Tu pago se ha realizado correctamente y te hemos enviado un correo de confirmación.' +
          '\n' +
          'Puedes seguir el estado de tu orden desde la sección de "Mis Pedidos" que se encuentra en tu perfil.'
        }
        onAccept={onAcceptModal}
        onCancel={() => {}}
        showCancel={false}
        visible={isModalVisible}
      />
      <TitleHeader style={{marginHorizontal: globalVars.outsidePadding}}>
        Pago
      </TitleHeader>
      <ScrollView style={styles.layoutPort}>
        <TitleHeader style={styles.titleText}>Dirección de envío</TitleHeader>
        <NavigateButton
          destination="AddAddress"
          subtitle={addressContentSubtitle}
          title={addressContentTitle}
        />
        <TitleHeader style={styles.titleText}>Método de pago</TitleHeader>
        <NavigateButton
          subtitle="Selecciona el método de pago"
          destination="AddPaymentMethod"
          title=""
        />
        <TitleHeader style={styles.titleText}>Envío</TitleHeader>
        <DefaultText>
          El precio por envío fijo es de ${deliveryInfo?.price} MXN.{' '}
          {deliveryInfo?.message}
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
          <DefaultText style={styles.defaultText}>
            ${deliveryInfo?.price}
          </DefaultText>
          <TitleHeader style={styles.defaultText}>${total}</TitleHeader>
        </View>
      </View>
      <CustomButton
        isDisabled={isDisabled}
        isLoading={isCreatingOrder}
        onPress={onPressOrder}
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
