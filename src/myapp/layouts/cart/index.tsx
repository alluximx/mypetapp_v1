import React, {useContext} from 'react';
import {List} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
// Context.
import {AuthContext} from '../../context/AuthContext';
// Hooks.
import useShoppingCart from '../../hooks/products/useShoppingCart';
// My components.
import AnchorText from '../../components/texts/anchor-text';
import CustomButton from '../../components/buttons/custom-button';
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import GenericCard from '../../components/cards/generic-card';
import TitleHeader from '../../components/texts/title-header';
// Global styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
import DefaultText from '../../components/texts/default-text';

export default ({navigation}): React.ReactElement => {
  const authContext = useContext(AuthContext);
  const {data, isLoading} = useShoppingCart(authContext.userId);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <View style={styles.topContainer}>
        <TitleHeader style={styles.title}>Carrito de compras</TitleHeader>
        <List
          data={data?.data?.length ? data?.data : []}
          // ListEmptyComponent={<ProductListEmpty />}
          scrollEnabled={data?.data?.length ? true : false}
          renderItem={({item}) => {
            return (
              <GenericCard
                data={{
                  additionalButtons: [
                    <AnchorText onPress={() => {}} style={styles.buttonDelete}>
                      Eliminar
                    </AnchorText>,
                    <AnchorText onPress={() => {}} style={styles.buttonEdit}>
                      Editar
                    </AnchorText>,
                  ],
                  additionalContent: [
                    <DefaultText style={styles.quantity}>
                      Cantidad: {item.quantity}
                    </DefaultText>,
                    <TitleHeader style={styles.price}>
                      ${item.total_item_price.toFixed(2)}
                    </TitleHeader>,
                  ],
                  // buttonText: `$${price.toFixed(2)}`,
                  // buttonAlign: 'right',
                  content: '200 gr',
                  coverImage:
                    'https://mpa-stage.s3.amazonaws.com/media/products_covers/image1.jpg',
                  title: 'Croquetas de Salmón',
                }}
                coverImageStyle={{height: 70}}
                onClick={() => {}}
                buttonStyle={styles.price}
                contentTextStyle={styles.subtitle}
              />
            );
          }}
          style={styles.listContainer}
        />
      </View>
      <View style={styles.bottomCardContainer}>
        <View style={styles.total}>
          <TitleHeader style={styles.totalText}>Total</TitleHeader>
          <TitleHeader style={styles.totalText}>$400.00</TitleHeader>
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
  quantity: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    color: globalColors.greenPrimary,
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
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
  buttonDelete: {
    color: globalColors.red,
    marginRight: 32,
  },
  buttonEdit: {
    color: globalColors.greenSecondary,
  },
});
