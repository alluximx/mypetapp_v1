import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, List} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// Hooks.
import useGetCategories from '../../../hooks/categories/useGetCategories';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import SearchInput from '../../../components/inputs/search-input';
// Global Styles.
import globalVars from '../../../styles/vars';
import globalColors from '../../../styles/colors';
import CustomSpinner from '../../../components/custom-spinner';

export default ({navigation}): React.ReactElement => {
  const {data, isLoading} = useGetCategories();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const onFilter = async (text: string) => {};
  // const Tab = createMaterialTopTabNavigator();

  // const TabContent = () => {
  //   return (
  //     <List data={[]} renderItem={() => <TitleHeader>HOMLA SIS</TitleHeader>} />
  //   );
  // };

  const toggleActiveFilter = (id) => {
    if (activeFilter === id) {
      setActiveFilter(null);
    } else {
      setActiveFilter(id);
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
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toggleActiveFilter(item.id)}
              style={[
                styles.filterOption,
                activeFilter === item.id && styles.filterOptionEnabled,
              ]}>
              <TitleHeader
                style={[
                  styles.filterOptionText,
                  activeFilter === item.id && styles.filterOptionTextEnabled,
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
        <List
          data={[]}
          renderItem={({item}) => <TitleHeader>{item}</TitleHeader>}
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
    paddingHorizontal: globalVars.outsidePadding,
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
});
