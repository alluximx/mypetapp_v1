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
  // Hook Calls
  const addOrder = useAddSaleOrder();
  const myProfile = useMyProfile();
  const {data: deliveryMessage, isLoading} = useDeliveryInformation();

  const {subtotal} = route.params;
  const {address, paymentMethod} = route.params?.data ?? {};
  // Modals & Loading
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // PaymentInfo
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');
  // Delivery Info
  const {id: deliveryId, message, price} = deliveryMessage?.data[0] ?? {};
  const total = (parseFloat(subtotal) + parseFloat(price)).toFixed(2);
  // Address
  const [addressTitle, setAddressTitle] = useState('');
  const [addressContent, setAddressContent] = useState('');

  const [form, setForm] = useState({
    delivery_address: address?.addressId,
    card_id: paymentMethod?.cardId,
    delivery_id: deliveryId,
  });

  const isDisabled =
    !form.card_id || !form.delivery_address || !form.delivery_id;

  useEffect(() => {
    if (address) {
      const {addressId, city, number, state, street, zipcode} = address;
      setAddressTitle(addressId ? myProfile.data?.data.name : '');
      setAddressContent(
        addressId
          ? `${street} #${number}\n${zipcode}, ${city} ${state?.name_state}`
          : '',
      );
      setForm({...form, delivery_address: addressId});
    }
    if (paymentMethod) {
      const {cardLabel, cardBrand, cardId} = paymentMethod;
      setCardTitle(cardBrand);
      setCardContent(cardLabel);
      setForm({...form, card_id: cardId});
    }
  }, [address, paymentMethod]);

  useEffect(() => {
    if (deliveryMessage) {
      setForm({...form, delivery_id: deliveryId});
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
          placeholder="Selecciona dirección de envío"
          subtitle={addressContent}
          title={addressTitle}
        />
        <TitleHeader style={styles.titleText}>Método de pago</TitleHeader>
        <NavigateButton
          destination="AddPaymentMethod"
          placeholder="Selecciona el método de pago"
          subtitle={cardContent}
          title={cardTitle}
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
