import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../custom-spinner';

const ProductList = (props): React.ReactElement => {
  const {data, isLoading} = useProductsList(props.categoryId);

  return isLoading ? (
    <CustomSpinner />
  ) : (
    // <List data={data ? data.data : []} renderItem={} />
    <CustomSpinner />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductList;
