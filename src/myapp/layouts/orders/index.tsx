import React, {useState, useEffect} from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// Hooks
import useEnforceScreenOnBack from '../../hooks/navigation/useEnforceScreenOnBack';
import useSalesOrders from '../../hooks/orders/useSalesOrders';
// My components
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import DefaultText from '../../components/texts/default-text';
import GenericCard from '../../components/cards/generic-card';
import TitleHeader from '../../components/texts/title-header';
// Global Styles
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';

export default ({navigation}): React.ReactElement => {
  const [salesOrders, setSalesOrders] = useState([]);
  const myOrders = useSalesOrders();

  useEnforceScreenOnBack('MyProfile');

  useEffect(() => {
    if (myOrders.data) {
      setSalesOrders(myOrders.data.data);
    }
  }, [myOrders.data]);

  const renderItem = (order) => {
    const trackingNumber = `#${order.item.id}`;
    const status = order.item.status;
    const deliveryTime =
      order.item.delivery_time === null
        ? 'Podrás consultar el tiempo de entrega cuando el producto esté en camino.'
        : order.item.delivery_time;
    const data = {
      buttonAlign: 'left',
      buttonColor: globalColors.greenPrimary,
      buttonText: status,
      date: null,
      content: `Tiempo de entrega estimado: \n${deliveryTime}`,
      images: null,
      styleCard: {},
      title: trackingNumber,
    };
    return (
      <GenericCard
        data={data}
        styleCard={{marginHorizontal: 0}}
        onClick={() => {
          const itemOrder = order.item;
          navigation.navigate('OrdersDetail', {order: itemOrder});
        }}
      />
    );
  };

  return myOrders.isLoading ? (
    <CustomSpinner />
  ) : salesOrders.length > 0 ? (
    <DefaultLayout style={styles.container}>
      <TitleHeader style={{marginBottom: 20}}>Pedidos</TitleHeader>
      <List
        style={styles.servicesContainer}
        data={salesOrders}
        renderItem={renderItem}
      />
    </DefaultLayout>
  ) : (
    <DefaultLayout style={styles.container}>
      <Image
        style={styles.dogImage}
        source={require('../../assets/images/pets/petOrders.png')}
      />
      <TitleHeader style={styles.center}>Pedidos</TitleHeader>
      <DefaultText style={[styles.center, styles.subtitle]}>
        No tienes pedidos pendientes.
      </DefaultText>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: globalVars.outsidePadding / 2,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
    padding: 10,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    paddingRight: globalVars.outsidePadding / 2,
  },
});
