import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {List} from '@ui-kitten/components';
// My components
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
import DefaultText from '../../components/texts/default-text';
import GenericCard from '../../components/cards/generic-card';
// Global Styles
import globalVars from '../../styles/vars';
import globalColors from '../../styles/colors';
import useSalesOrders from '../../hooks/orders/useSalesOrders';

export default ({navigation}): React.ReactElement => {
  const [salesOrders, setSalesOrders] = useState([]);
  const myOrders = useSalesOrders();

  useEffect(() => {
    if (myOrders.data) {
      setSalesOrders(myOrders.data.data);
    }
  }, [myOrders.data]);

  const renderItem = (order) => {
    const trackingNumber = order.item.tracking_number;
    const status = order.item.status;
    const deliveryTime = order.item.delivery_time;
    const data = {
      buttonAlign: 'left',
      buttonColor: globalColors.greenPrimary,
      buttonText: status,
      date: null,
      content: `Tiempo de entrega estimado: \n${deliveryTime}`,
      images: null,
      styleCard: {},
      title: `#${trackingNumber}`,
    };
    return (
      <GenericCard
        data={data}
        styleCard={{marginHorizontal: 0}}
        onClick={null}
      />
    );
  };

  return salesOrders.length > 0 ? (
    <DefaultLayout>
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
    paddingHorizontal: 0,
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
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});
