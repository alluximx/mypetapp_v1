import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
// My Components.
import AddButton from '../../../components/buttons/add-button';
import DefaultLayout from '../../../components/layouts/default-layout';
import CustomSpinner from '../../../components/custom-spinner';
import TitleHeader from '../../../components/texts/title-header';
import AnchorText from '../../../components/texts/anchor-text';
// Global Styles
import globalColors from '../../../styles/colors';
import globalVars from '../../../styles/vars';
// UI Kitten
import {List} from '@ui-kitten/components';
// Hook.
import useEnforceScreenOnBack from '../../../hooks/navigation/useEnforceScreenOnBack';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
import VaccineList from '../../../components/Vaccine/vaccine-list';

export default ({navigation, route}): React.ReactElement => {
  const vaccinesTypeQuery = useGetVaccines(true);
  const [type, setType] = useState<string>('');
  const [rangeDate, setRangeDate] = useState<string>('');

  useEnforceScreenOnBack('DetailPet', {petId: route.params.pet.id});

  const vaccinesData = vaccinesTypeQuery.isLoading
    ? []
    : vaccinesTypeQuery.data?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          style={{backgroundColor: globalColors.backgroundDefault}}
          iconStyle={{
            tintColor: globalColors.greenSecondary,
            height: 35,
            width: 35,
          }}
          onAdd={() =>
            navigation.navigate('AddVaccine', {petId: route.params.pet.id})
          }
          isSubmit
        />
      ),
    });
  }, [navigation, route.params]);

  const toggleType = (id) => {
    if (type === id) {
      setType('');
    } else {
      setType(id);
    }
  };

  return vaccinesTypeQuery.isLoading ? (
    <CustomSpinner />
  ) : (
    <DefaultLayout>
      <View style={styles.filterSection}>
        <TitleHeader style={styles.listTitle}>Vacunas</TitleHeader>
        <AnchorText
          onPress={() =>
            navigation.navigate('VaccineFilter', {
              petId: route.params.pet.id,
              typeId: type,
              rangeDate,
              setRangeDate: setRangeDate,
            })
          }
          style={styles.filterButton}>
          Filtrar
        </AnchorText>
      </View>
      <View>
        <List
          data={vaccinesData ? vaccinesData : []}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toggleType(item.id)}
              style={[
                styles.filterOption,
                type === item.id && styles.filterOptionEnabled,
                index === 0 && styles.filterOptionLeftSpacing,
                index === vaccinesData.length - 1 &&
                  styles.filterOptionRightSpacing,
              ]}>
              <TitleHeader
                style={[
                  styles.filterOptionText,
                  type === item.id && styles.filterOptionTextEnabled,
                ]}>
                {item.vaccine_name}
              </TitleHeader>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.filterOptionsContainer}
        />
      </View>
      <VaccineList
        petId={route.params.pet.id}
        typeId={type}
        rangeDate={rangeDate}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    marginBottom: 8,
    flex: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  filterSection: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
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
    marginLeft: 0,
  },
  filterOptionRightSpacing: {
    marginRight: 0,
  },
});
