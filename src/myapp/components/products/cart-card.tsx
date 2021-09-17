import React from 'react';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useDeleteShoppingCart from '../../hooks/products/useDeleteShoppingCart';
// My Components.
import AnchorText from '../texts/anchor-text';
import DefaultText from '../texts/default-text';
import GenericCard from '../cards/generic-card';
import TitleHeader from '../texts/title-header';
// Types.
import {CartCardProps} from '../../types/components/products';

const CartCard = (props: CartCardProps): React.ReactElement => {
  const deleteCart = useDeleteShoppingCart(props.userId);
  const onPressDelete = (cartId: string) => deleteCart.mutate(cartId);
  const onPressEdit = () => {
    props.setModalVisible(true);
  };

  return (
    <GenericCard
      data={{
        additionalButtons: [
          <AnchorText
            onPress={() => onPressDelete(props.id)}
            style={styles.buttonDelete}>
            Eliminar
          </AnchorText>,
          <AnchorText onPress={onPressEdit} style={styles.buttonEdit}>
            Editar
          </AnchorText>,
        ],
        additionalContent: [
          <DefaultText style={styles.quantity}>
            Cantidad: {props.quantity}
          </DefaultText>,
          <TitleHeader style={styles.price}>
            ${props.totalItemPrice.toFixed(2)}
          </TitleHeader>,
        ],
        content: props.variantName,
        coverImage: props.cover_image,
        title: props.productName,
      }}
      coverImageStyle={styles.coverImage}
      onClick={onPressEdit}
      buttonStyle={styles.price}
      contentTextStyle={styles.subtitle}
    />
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  buttonDelete: {
    color: globalColors.red,
    marginRight: 32,
  },
  buttonEdit: {
    color: globalColors.greenSecondary,
  },
});

export default CartCard;
