import React, {useContext, useEffect, useState} from 'react';
import {List} from '@ui-kitten/components';
import {AppState, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
// Context.
import {AuthContext} from '../../context/AuthContext';
// Hooks.
import useShoppingCart from '../../hooks/products/useShoppingCart';
// My components.
import CartCard from '../../components/products/cart-card';
import CustomButton from '../../components/buttons/custom-button';
import CustomModal from '../../components/modals/custom-modal';
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import TitleHeader from '../../components/texts/title-header';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Types.
import {Cart} from '../../types/models';

export default ({navigation}): React.ReactElement => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const shoppingCartData = useShoppingCart(authContext.userId);
  const {data, isLoading} = shoppingCartData;

  const refetchOnReopenApp = () => {
    // If reenters app after minimizing.
    if (AppState.currentState === 'active') {
      shoppingCartData.refetch();
    }
  };

  useEffect(() => {
    const subscribe = AppState.addEventListener('change', refetchOnReopenApp);
    return () => {
      subscribe.remove();
    };
  }, []);

  const totalAmount = (data?.data?.length > 0
    ? data?.data
        ?.map((cart: Cart) => cart.total_item_price)
        .reduce((total: number, cart: number) => total + cart)
    : 0
  ).toFixed(2);

  const onAccept = () => setIsModalVisible(false);

  const onPressPay = () => {
    // Refetch variants and cart products.
    queryClient.refetchQueries('get-variants');
    shoppingCartData.refetch().then((response) => {
      // Compare and check if stock existances match
      // requested products.
      const stockMatches = response.data?.data?.every(
        (cartItem: Cart) =>
          cartItem.item.stock > 0 && cartItem.quantity <= cartItem.item.stock,
      );

      if (stockMatches) {
        navigation.navigate('PaymentSummary', {
          subtotal: totalAmount,
        });
      } else {
        setIsModalVisible(true);
      }
    });
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <CustomModal
        labelAccept="Entendido"
        title="Algunos productos han cambiado"
        text="Edita o elimina los productos para continuar con tu pago."
        onAccept={onAccept}
        onCancel={() => {}}
        showCancel={false}
        visible={isModalVisible}
      />
      <View style={styles.topContainer}>
        <TitleHeader style={styles.title}>Carrito de compras</TitleHeader>
        <List
          data={data?.data?.length ? data?.data : []}
          scrollEnabled={data?.data?.length ? true : false}
          renderItem={({item}) => (
            <CartCard
              cover_image={item.item.product.cover_image}
              id={item.id}
              isLastOne={data?.data?.length === 1}
              itemId={item.item.id}
              key={item.id}
              productId={item.item.product.id}
              productName={item.item.product.name}
              quantity={item.quantity}
              stock={item.item.stock}
              totalItemPrice={item.total_item_price}
              variantName={item.item.name}
            />
          )}
          style={styles.listContainer}
        />
      </View>
      <View style={styles.bottomCardContainer}>
        <View style={styles.total}>
          <TitleHeader style={styles.totalText}>Total</TitleHeader>
          <TitleHeader style={styles.totalText}>${totalAmount}</TitleHeader>
        </View>
        <CustomButton isLight onPress={onPressPay} isSubmit>
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
