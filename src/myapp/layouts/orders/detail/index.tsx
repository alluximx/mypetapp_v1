import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {List} from '@ui-kitten/components';
// Hooks
import useGetSaleOrder from '../../../hooks/orders/useGetSaleOrder';
// My components
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import DefaultText from '../../../components/texts/default-text';
import GenericCard from '../../../components/cards/generic-card';
import TitleHeader from '../../../components/texts/title-header';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';

export default ({navigation, route}): React.ReactElement => {
  const [orderSale, setOrderSale] = useState(route.params.order);

  const {data: orderData, isLoading, isSuccess} = useGetSaleOrder(
    route.params.id,
    route.params.order ? true : false,
  );

  useEffect(() => {
    if (!route.params.order) {
      if (isSuccess) {
        setOrderSale(orderData?.data);
      }
    }
  }, [isSuccess]);

  const addressOrder = orderSale?.delivery_address;
  const paymentOrder = orderSale?.card_id;
  const OrderSalesDetail = orderSale?.sales_detail;

  const contentAddress =
    addressOrder?.street +
    ' #' +
    addressOrder?.number +
    '\n' +
    addressOrder?.zipcode +
    ', ' +
    addressOrder?.city +
    ' ' +
    addressOrder?.state?.name +
    '.';

  const data = {
    buttonAlign: 'left',
    buttonColor: globalColors.greenPrimary,
    buttonText: orderSale?.status,
    date: null,
    content: `Tiempo de entrega estimado: \n${
      orderSale?.delivery_time === null
        ? 'Podrás consultar el tiempo de entrega cuando el producto esté en camino.'
        : orderSale?.delivery_time
    }`,
    images: null,
    styleCard: {},
    title: `#${orderSale?.id}`,
  };

  const dataDelivery = {
    buttonText: null,
    date: null,
    content:
      orderSale?.tracking_number === null
        ? 'Podrás consultar el número de guía cuando el producto esté en camino.'
        : `#${orderSale?.tracking_number}`,
    images: null,
    styleCard: {},
    title:
      orderSale?.delivery_company === null
        ? 'Estamos trabajando en tu pedido'
        : orderSale?.delivery_company,
  };

  const dataAddress = {
    buttonText: null,
    date: null,
    content: contentAddress,
    images: null,
    styleCard: {},
    title: addressOrder?.user_address?.name,
  };

  const dataPayment = {
    buttonText: null,
    date: null,
    content: `****${paymentOrder?.last4}`,
    images: null,
    styleCard: {},
    title: paymentOrder?.brand,
  };

  const renderItem = (product) => {
    const productName = product.item.product_name;
    const variantName = product.item.item;
    const totalPrice = product.item.total_price;
    const quantity = product.item.quantity;
    const productImage = product.item.product_image;
    return (
      <GenericCard
        buttonStyle={styles.price}
        contentTextStyle={styles.subtitle}
        coverImageStyle={styles.coverImage}
        styleCard={{marginHorizontal: 0}}
        data={{
          additionalContent: [
            <DefaultText style={styles.quantity}>
              Cantidad: {quantity}
            </DefaultText>,
            <TitleHeader style={styles.price}>
              ${totalPrice.toFixed(2)}
            </TitleHeader>,
          ],
          content: variantName,
          coverImage: `https://mpa-stage.s3.amazonaws.com/media/${productImage}`,
          title: productName,
        }}
        onClick={null}
      />
    );
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <TitleHeader style={{marginBottom: 24}}>Detalle de Pedido</TitleHeader>
      <ScrollView style={styles.scrollView}>
        <GenericCard
          data={data}
          styleCard={{marginHorizontal: 0}}
          onClick={null}
        />
        <TitleHeader style={styles.titleText}>Número de guía</TitleHeader>
        <GenericCard
          data={dataDelivery}
          styleCard={{marginHorizontal: 0}}
          onClick={null}
        />
        <TitleHeader style={styles.titleText}>Artículos</TitleHeader>
        <List
          style={styles.servicesContainer}
          data={OrderSalesDetail}
          renderItem={renderItem}
        />
        <TitleHeader style={styles.titleText}>Dirección de envío</TitleHeader>
        <GenericCard
          data={dataAddress}
          styleCard={{marginHorizontal: 0}}
          onClick={null}
        />
        <TitleHeader style={styles.titleText}>Método de pago</TitleHeader>
        <GenericCard
          data={dataPayment}
          styleCard={{marginHorizontal: 0}}
          onClick={null}
        />
        <View style={styles.summaryContainer}>
          <View style={styles.infoSummary1}>
            <DefaultText style={styles.defaultText}>Subtotal</DefaultText>
            <DefaultText style={styles.defaultText}>Envío</DefaultText>
            <TitleHeader style={styles.defaultText}>Total</TitleHeader>
          </View>
          <View style={styles.infoSummary2}>
            <DefaultText style={styles.defaultText}>
              ${orderSale?.total_price}
            </DefaultText>
            <DefaultText style={styles.defaultText}>
              ${orderSale?.delivery_price}
            </DefaultText>
            <TitleHeader style={styles.defaultText}>
              ${orderSale?.total.toFixed(2)}
            </TitleHeader>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: globalVars.outsidePadding / 2,
  },
  scrollView: {
    paddingRight: globalVars.outsidePadding / 2,
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  infoSummary1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoSummary2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  defaultText: {
    marginTop: 15,
  },
  coverImage: {height: 70},
  subtitle: {
    fontSize: 14,
    marginTop: 0,
  },
  quantity: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    color: globalColors.greenPrimary,
    fontSize: 16,
    marginTop: 4,
  },
});
