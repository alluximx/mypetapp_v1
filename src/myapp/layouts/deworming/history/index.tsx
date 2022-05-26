import React, {useLayoutEffect, useState} from 'react';
import {Dimensions, View, TouchableOpacity} from 'react-native';
// Global Styles
import globalColors from '../../../styles/colors';
// Hook.
import useEnforceScreenOnBack from '../../../hooks/navigation/useEnforceScreenOnBack';
import useGetVaccines from '../../../hooks/vaccines/useGetVaccines';
// My Components.
import AddButton from '../../../components/buttons/add-button';
import CustomSpinner from '../../../components/custom-spinner';
import DefaultLayout from '../../../components/layouts/default-layout';
import TitleHeader from '../../../components/texts/title-header';
import DewormingList from '../../../components/deworming/deworming-list';
import AnchorText from '../../../components/texts/anchor-text';
// UI kitten
import {StyleService, List} from '@ui-kitten/components';

export default ({navigation, route}): React.ReactElement => {
  const vaccinesTypeQuery = useGetVaccines(false);
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
            navigation.navigate('AddDeworming', {petId: route.params.pet.id})
          }
          isSubmit
        />
      ),
    });
  }, [navigation]);

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
        <TitleHeader style={styles.listTitle}>Desparasitaciones</TitleHeader>
        <AnchorText
          onPress={() =>
            navigation.navigate('DewormingFilter', {
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
      <DewormingList
        petId={route.params.pet.id}
        typeId={type}
        rangeDate={rangeDate}
      />
    </DefaultLayout>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.backgroundDefault,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    paddingTop: 0,
    width: width,
  },
  dogImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 390,
    maxHeight: 390,
    marginVertical: 5,
  },
  center: {
    alignSelf: 'center',
  },
  servicesContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
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
