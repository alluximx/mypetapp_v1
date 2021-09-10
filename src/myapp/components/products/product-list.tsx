import {List} from '@ui-kitten/components';
import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
// Global Styles.
import globalColors from '../../styles/colors';
// Hooks.
import useProductsList from '../../hooks/products/useProductsList';
// My Components.
import CustomSpinner from '../custom-spinner';
import ProductCard from './product-card';
// Types.
import {ProductListProps} from '../../types/components/products';
import DefaultText from '../texts/default-text';
import TitleHeader from '../texts/title-header';
import globalVars from '../../styles/vars';

const ProductList = (props: ProductListProps): React.ReactElement => {
  const {data, isLoading} = useProductsList(
    props.categoryId ?? '',
    props.brandId ?? '',
  );

  const emptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={require('./assets/no-results.png')}
      />
      <TitleHeader style={styles.emptyTitle}>
        No se encontraron resultados
      </TitleHeader>
      <DefaultText style={styles.emptySubtitle}>
        Intenta cambiar las opciones de filtros para obtener mejores resultados.
      </DefaultText>
    </View>
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <CustomSpinner />
    </View>
  ) : (
    <List
      data={data ? data.data : []}
      ListEmptyComponent={emptyListComponent}
      scrollEnabled={data?.data?.length ? true : false}
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
  loadingContainer: {
    flex: 1,
    flexBasis: '50%',
  },
  container: {
    backgroundColor: globalColors.backgroundDefault,
    marginTop: 16,
  },
  emptyContainer: {
    padding: globalVars.outsidePadding,
  },
  emptyImage: {
    width: '100%',
    maxHeight: 250,
    resizeMode: 'contain',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    fontFamily: globalVars.fontBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },
});

export default ProductList;
