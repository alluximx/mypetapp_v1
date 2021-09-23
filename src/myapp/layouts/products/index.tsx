import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {List} from '@ui-kitten/components';
// Constants.
import {productPrices} from '../../constants';
// Global Styles.
import globalColors from '../../styles/colors';
import globalVars from '../../styles/vars';
// Hooks.
import useGetCategories from '../../hooks/categories/useGetCategories';
// My Components.
import AnchorText from '../../components/texts/anchor-text';
import CartButton from '../../components/buttons/cart-button';
import CustomSpinner from '../../components/custom-spinner';
import DefaultLayout from '../../components/layouts/default-layout';
import ProductList from '../../components/products/product-list';
import SearchInput from '../../components/inputs/search-input';
import TitleHeader from '../../components/texts/title-header';

export default ({navigation}): React.ReactElement => {
  const {data, isLoading} = useGetCategories();
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [prices, setPrices] = useState([
    productPrices.MIN_PRICE,
    productPrices.MAX_PRICE,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <CartButton />;
      },
    });
  }, [navigation]);

  const togglecategory = (id) => {
    if (category === id) {
      setCategory('');
    } else {
      setCategory(id);
    }
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout style={styles.container}>
      <View style={styles.headerContainer}>
        <TitleHeader>Productos para tus mascotas</TitleHeader>
        <View style={styles.filterSection}>
          <SearchInput onFilter={setName} style={styles.searchInput} />
          <AnchorText
            onPress={() =>
              navigation.navigate('ProductFilter', {
                category,
                name,
                brand,
                setBrand,
                prices,
                setPrices,
              })
            }
            style={styles.filterButton}>
            Filtrar
          </AnchorText>
        </View>
      </View>
      <View>
        <List
          data={data ? data.data : []}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => togglecategory(item.id)}
              style={[
                styles.filterOption,
                category === item.id && styles.filterOptionEnabled,
                index === 0 && styles.filterOptionLeftSpacing,
                index === data?.data.length - 1 &&
                  styles.filterOptionRightSpacing,
              ]}>
              <TitleHeader
                style={[
                  styles.filterOptionText,
                  category === item.id && styles.filterOptionTextEnabled,
                ]}>
                {item.name}
              </TitleHeader>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.filterOptionsContainer}
        />
      </View>
      <View style={styles.resultSection}>
        <ProductList
          categoryId={category}
          name={name}
          brandId={brand}
          prices={prices}
          setBrand={setBrand}
        />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    paddingHorizontal: globalVars.outsidePadding,
  },
  filterSection: {
    flexDirection: 'row',
    marginTop: 18,
  },
  searchInput: {
    flexGrow: 1,
  },
  filterButton: {
    paddingLeft: 18,
    paddingVertical: 18,
  },
  filterOptionsContainer: {
    marginTop: 16,
    backgroundColor: globalColors.backgroundDefault,
  },
  filterOption: {
    paddingVertical: 6,
    paddingBottom: 2,
    paddingHorizontal: 16,
    backgroundColor: globalColors.backgroundDefault,
    borderRadius: 10,
  },
  filterOptionEnabled: {
    backgroundColor: globalColors.greenSecondary,
  },
  filterOptionText: {
    color: globalColors.lightGray,
    fontSize: 16,
  },
  filterOptionTextEnabled: {
    color: globalColors.white,
  },
  filterOptionLeftSpacing: {
    marginLeft: globalVars.outsidePadding,
  },
  filterOptionRightSpacing: {
    marginRight: globalVars.outsidePadding,
  },
  resultSection: {
    flexGrow: 1,
    flexBasis: 300,
  },
});
