import React from 'react';
import {StyleSheet} from 'react-native';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import GenericCard from '../cards/generic-card';

const ProductCard = (props): React.ReactElement => {
  const {data, isLoading} = useProductsList(props.categoryId);

  return (
    <GenericCard
      data={{
        content: props.brand.name,
        title: props.name,
        buttonText: null,
        buttonAlign: 'right',
      }}
      onClick={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
