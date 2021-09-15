import {List} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../custom-spinner';
import ProductCard from './product-card';
// Types.
import {ProductListProps} from '../../types/components/products';
import ProductListEmpty from './product-list-empty';

const ProductList = (props: ProductListProps): React.ReactElement => {
  const {data, isLoading} = useProductsList(
    props.categoryId ?? '',
    props.name ?? '',
    props.brandId ?? '',
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <CustomSpinner />
    </View>
  ) : (
    <List
      data={data ? data.data : []}
      ListEmptyComponent={<ProductListEmpty />}
      scrollEnabled={data?.data?.length ? true : false}
      renderItem={({item}) => (
        <ProductCard
          brand={item.brand.name}
          cover_image={item.cover_image}
          name={item.name}
        />
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexBasis: '50%',
  },
  container: {
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 16,
  },
});

export default ProductList;
