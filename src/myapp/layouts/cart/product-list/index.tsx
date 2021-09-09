import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Input, List, Tab, TabBar} from '@ui-kitten/components';
import {ProductListScreen} from './product-list.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// My Components.
import AnchorText from '../../../components/texts/anchor-text';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import SearchInput from '../../../components/inputs/search-input';
// Global Styles.
import globalVars from '../../../styles/vars';
import globalColors from '../../../styles/colors';

export default ({navigation}): React.ReactElement => {
  const renderIcon = (props) => <Icon {...props} name={'search'} />;

  const onFilter = async (text: string) => {};
  const Tab = createMaterialTopTabNavigator();

  const TabContent = () => {
    return (
      <List data={[]} renderItem={() => <TitleHeader>HOMLA SIS</TitleHeader>} />
    );
  };

  return (
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
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: globalColors.backgroundDefault,
            elevation: 0,
            width: 'auto',
            minWidth: 0,
          },
          activeTintColor: globalColors.white,
          contentContainerStyle: {
            paddingHorizontal: globalVars.outsidePadding,
          },
          inactiveTintColor: globalColors.darkGray,
          indicatorStyle: {
            backgroundColor: 'transparent',
          },
          labelStyle: {
            fontFamily: globalVars.fontBold,
            fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
            fontSize: 16,
            textTransform: 'none',
          },
          pressColor: 'transparent',
          tabStyle: {
            backgroundColor: globalColors.greenSecondary,
            borderRadius: 10,
            height: 32,
            marginHorizontal: 8,
            paddingHorizontal: 10,
            width: 'auto',
          },
          renderTabBarItem: (props) => {
            console.log(props.getLabelText());
            return (
              <TouchableOpacity style={props.style} onPress={props.onPress}>
                <TitleHeader>{props.getLabelText}</TitleHeader>
              </TouchableOpacity>
            );
          },
          scrollEnabled: true,
        }}>
        <Tab.Screen
          name="Comida"
          component={() => <TitleHeader>OMLA</TitleHeader>}
        />
        <Tab.Screen
          name="Juguetes"
          component={() => <TitleHeader>OMLA 2</TitleHeader>}
        />
        <Tab.Screen
          name="Juguetes 2"
          component={() => <TitleHeader>OMLA 2</TitleHeader>}
        />
        <Tab.Screen
          name="Juguetes 3"
          component={() => <TitleHeader>OMLA 2</TitleHeader>}
        />
        <Tab.Screen
          name="Juguetes 4"
          component={() => <TitleHeader>OMLA 2</TitleHeader>}
        />
        <Tab.Screen
          name="Juguetes 5"
          component={() => <TitleHeader>OMLA 2</TitleHeader>}
        />
      </Tab.Navigator>
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
});
