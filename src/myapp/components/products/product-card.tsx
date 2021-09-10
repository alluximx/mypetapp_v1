import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// My Components.
import GenericCard from '../cards/generic-card';
// Types.
import {ProductCardProps} from '../../types/components/products';

const ProductCard = (props: ProductCardProps): React.ReactElement => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <GenericCard
        data={{
          buttonText: '$200.00',
          buttonAlign: 'right',
          content: props.brand,
          coverImage: props.cover_image,
          title: props.name,
        }}
        onClick={() => {}}
        buttonStyle={styles.price}
        contentTextStyle={styles.subtitle}
      />
    </TouchableOpacity>
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
