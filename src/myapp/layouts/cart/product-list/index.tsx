import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {List} from '@ui-kitten/components';
// Hooks.
import useGetCategories from '../../../hooks/categories/useGetCategories';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import ProductList from '../../../components/products/product-list';
import SearchInput from '../../../components/inputs/search-input';
import TitleHeader from '../../../components/texts/title-header';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';

export default ({navigation}): React.ReactElement => {
  const {data, isLoading} = useGetCategories();
  const [category, setCategory] = useState<string | null>(null);
  const onFilter = async (text: string) => {};

  const togglecategory = (id) => {
    if (category === id) {
      setCategory(null);
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
          <SearchInput onFilter={onFilter} style={styles.searchInput} />
          <AnchorText onPress={() => {}} style={styles.filterButton}>
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
      <View>
        <ProductList categoryId={category} />
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
});
