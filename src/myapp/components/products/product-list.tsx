import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../custom-spinner';
import ProductCard from './product-card';
import ProductListEmpty from './product-list-empty';
// Types.
import {ProductListProps} from '../../types/components/products';
import {Product} from '../../types/models';

const ProductList = (props: ProductListProps): React.ReactElement => {
  const navigation = useNavigation();
  const {data, isLoading} = useProductsList(
    props.categoryId ?? '',
    props.name ?? '',
    props.brandId ?? '',
  );

  const filteredData =
    data?.data?.filter(
      (product: Product) =>
        props.prices[0] <= product.range_prices.price__min &&
        props.prices[1] >= product.range_prices.price__max,
    ) ?? [];

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <CustomSpinner />
    </View>
  ) : (
    <List
      data={filteredData}
      ListEmptyComponent={<ProductListEmpty />}
      scrollEnabled={data?.data?.length ? true : false}
      renderItem={({item}) => (
        <ProductCard
          brand={item.brand.name}
          cover_image={item.cover_image}
          name={item.name}
          range_prices={item.range_prices}
          onPress={() => navigation.navigate('ProductDetail', {...item})}
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
