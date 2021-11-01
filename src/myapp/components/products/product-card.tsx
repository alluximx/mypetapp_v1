import React from 'react';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components.
import GenericCard from '../cards/generic-card';
// Types.
import {ProductCardProps} from '../../types/components/products';

const ProductCard = (props: ProductCardProps): React.ReactElement => {
  const {brand, cover_image, name, onPress, range_prices} = props;

  const price = (range_prices.price__max + range_prices.price__min) / 2;

  return (
    <GenericCard
      data={{
        buttonText: `$${price.toFixed(2)}`,
        buttonAlign: 'right',
        content: brand,
        coverImage: cover_image,
        title: name,
      }}
      onClick={onPress}
      buttonStyle={styles.price}
      contentTextStyle={styles.subtitle}
      wrapTitle={true}
    />
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    marginTop: 0,
  },
  price: {
    color: globalColors.greenPrimary,
  },
});

export default ProductCard;
