import React, {useContext, useState} from 'react';
import {List} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
// Context.
import {AuthContext} from '../../context/AuthContext';
// Hooks.
import useShoppingCart from '../../hooks/products/useShoppingCart';
// My components.
import CartCard from '../../components/products/cart-card';
import CustomButton from '../../components/buttons/custom-button';
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types.
import {Cart} from '../../types/models';

export default ({navigation}): React.ReactElement => {
  const authContext = useContext(AuthContext);
  const {data, isLoading} = useShoppingCart(authContext.userId);

  const totalAmount =
    data?.data?.length > 0
      ? data?.data
          ?.map((cart: Cart) => cart.total_item_price)
          .reduce((total: number, cart: number) => total + cart)
      : 0;

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <View style={styles.topContainer}>
        <TitleHeader style={styles.title}>Carrito de compras</TitleHeader>
        <List
          data={data?.data?.length ? data?.data : []}
          scrollEnabled={data?.data?.length ? true : false}
          renderItem={({item}) => (
            <CartCard
              cover_image={item.item.product.cover_image}
              id={item.id}
              productId={item.item.product.id}
              itemId={item.item.id}
              productName={item.item.product.name}
              quantity={item.quantity}
              totalItemPrice={item.total_item_price}
              userId={authContext.userId}
              variantName={item.item.name}
            />
          )}
          style={styles.listContainer}
        />
      </View>
      <View style={styles.bottomCardContainer}>
        <View style={styles.total}>
          <TitleHeader style={styles.totalText}>Total</TitleHeader>
          <TitleHeader style={styles.totalText}>
            ${totalAmount.toFixed(2)}
          </TitleHeader>
        </View>
        <CustomButton isLight onPress={() => {}}>
          Continuar con Pago
        </CustomButton>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 0},
  topContainer: {
    flexGrow: 1,
    flex: 1,
  },
  title: {
    paddingHorizontal: globalVars.outsidePadding,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 0,
  },
  listContainer: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  bottomCardContainer: {
    backgroundColor: globalColors.greenPrimary,
    padding: globalVars.outsidePadding,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  totalText: {
    color: globalColors.white,
  },
});
