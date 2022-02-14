import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {List} from '@ui-kitten/components';
// Constants.
import {servicesTabs} from '../../../constants';
// Global Styles.
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// My Components.
import DefaultLayout from '../../../components/layouts/default-layout';
import NextServicesList from '../../../components/services/next-services-list';
import TitleHeader from '../../../components/texts/title-header';

export default ({navigation}): React.ReactElement => {
  const [tab, setTab] = useState(servicesTabs[0].id);

  return (
    <DefaultLayout style={styles.container}>
      <View style={styles.headerContainer}>
        <TitleHeader>Próximos Servicios</TitleHeader>
      </View>
      <View>
        <List
          data={servicesTabs}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setTab(item.id)}
              style={[
                styles.filterOption,
                tab === item.id && styles.filterOptionEnabled,
                index === 0 && styles.filterOptionLeftSpacing,
                index === servicesTabs.length - 1 &&
                  styles.filterOptionRightSpacing,
              ]}>
              <TitleHeader
                style={[
                  styles.filterOptionText,
                  tab === item.id && styles.filterOptionTextEnabled,
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
        <NextServicesList tab={tab} />
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
