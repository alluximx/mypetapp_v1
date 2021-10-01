import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
// Env
import environments from '../../environments';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useDeleteShoppingCart from '../../hooks/products/useDeleteShoppingCart';
import useVariants from '../../hooks/products/useVariants';
// My Components.
import AnchorText from '../texts/anchor-text';
import EditProductModal from '../modals/edit-product-modal';
import DefaultText from '../texts/default-text';
import GenericCard from '../cards/generic-card';
import TitleHeader from '../texts/title-header';
// Types.
import {CartCardProps} from '../../types/components/products';
import {Variant, VariantOption} from '../../types/models';

const CartCard = (props: CartCardProps): React.ReactElement => {
  const {
    cover_image,
    id,
    isLastOne,
    itemId,
    productId,
    productName,
    quantity,
    stock,
    totalItemPrice,
    variantName,
  } = props;
  const deleteCart = useDeleteShoppingCart(isLastOne);
  const {data} = useVariants(productId);
  const onPressDelete = (cartId: string) => deleteCart.mutate(cartId);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressEdit = () => setModalVisible(true);
  const emptyStock = stock === 0;
  const lessStock = quantity > stock;
  return (
    <>
      <EditProductModal
        id={id}
        onCancel={() => setModalVisible(false)}
        presentationId={itemId}
        quantity={quantity}
        setVisible={setModalVisible}
        variantsList={
          data?.data?.length
            ? data.data
                .map((variantItem: Variant) => ({
                  images: variantItem.images.map((image) => ({
                    uri: environments.IMAGES_HOST + image.image,
                  })),
                  label: variantItem.name,
                  price: variantItem.price,
                  stock: variantItem.stock,
                  value: variantItem.id,
                }))
                .sort(
                  (variant1: VariantOption, variant2: VariantOption) =>
                    variant1.label > variant2.label,
                )
            : []
        }
        visible={modalVisible}
      />
      <GenericCard
        buttonStyle={styles.price}
        contentTextStyle={styles.subtitle}
        coverImageStyle={styles.coverImage}
        data={{
          additionalButtons: [
            <AnchorText
              onPress={() => onPressDelete(id)}
              style={styles.buttonDelete}
              isSubmit>
              Eliminar
            </AnchorText>,
            <AnchorText
              isDisabled={emptyStock}
              onPress={onPressEdit}
              style={[styles.buttonEdit, emptyStock && styles.disabledEdit]}
              isSubmit>
              Editar
            </AnchorText>,
          ],
          additionalContent: [
            <DefaultText style={styles.quantity}>
              Cantidad: {quantity}
            </DefaultText>,
            <TitleHeader style={styles.price}>
              ${totalItemPrice.toFixed(2)}
            </TitleHeader>,
          ],
          additionalHeader: emptyStock
            ? 'Este producto ya no está disponible, elimínalo para continuar'
            : lessStock
            ? 'El stock de este producto ha cambiado, edítalo o elimínalo para continuar'
            : null,
          content: variantName,
          coverImage: cover_image,
          title: productName,
        }}
        isDisabled={emptyStock}
        onClick={onPressEdit}
      />
    </>
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
  disabledEdit: {
    color: globalColors.darkGray,
  },
});

export default CartCard;
