import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../custom-spinner';
import ProductCard from './product-card';
// Types.
import {ProductListProps} from '../../types/components/products';

const ProductList = (props: ProductListProps): React.ReactElement => {
  const {data, isLoading} = useProductsList(
    props.categoryId ?? '',
    props.brandId ?? '',
  );

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <List
      data={data ? data.data : []}
      renderItem={({item}) => (
        <ProductCard
          brand={item.brand.name}
          name={item.name}
          cover_image={item.cover_image}
        />
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 16,
  },
});

export default ProductList;
